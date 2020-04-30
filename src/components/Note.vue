<template>
    <div class="container">
        <header class="jumbotron">
            <h3>

                <strong>{{exampleProp}}</strong> this my note id

                notatka o id: {{exampleProp}}
                <ul id="example-1">
                    <li>
                        nazwa notatki: {{ content.name }}
                    </li>
                    <li>
                        kraj: {{ content.country }}
                    </li>
                    <li>
                        miasto: {{ content.city }}
                    </li>
                    <li>
                        komentarz: {{ content.comment }}
                    </li>
                    <li>
                        data od: {{ content.dateFrom }}
                    </li>
                    <li>
                        data do: {{ content.dateTo }}
                    </li>
                    <li>
                        przedmioty: {{ content.items }}
                    </li>
                </ul>

            </h3>
            <router-link :to="{ name: 'user'}">Pokaż wszystkkie</router-link>

        </header>

        <label>
            Komentarz do notatki
            <input v-model="commentValue" type="text">
        </label>
        <button type="submit" @click.stop.prevent="saveComment()" class="btn btn-primary">zapisz komentarz</button>
    </div>
</template>

<script>
    import UserService from "@/services/user.service";

    export default {

        name: 'Note',

        props: {
            exampleProp: String
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            note() {
                return this.$route.query.myprop;
            },
        },
        data() {
            return {
                content: '',
                commentValue: ''
            };
        },
        mounted() {
            if (this.currentUser) {
                UserService.getOneNote(this.exampleProp).then(
                    response => {
                        this.content = response.data;
                    },
                    error => {
                        this.content =
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString();
                    }
                );
            } else {
                this.$router.push('/login');
            }
        },
        methods:
            {
                saveComment() {
                    UserService.updateComment(this.content.id, this.commentValue).then(
                        () => {
                            alert("pomyslnie zapisano komentarz");
                            this.content.comment = this.commentValue;
                            this.commentValue = ''
                        },
                        error => {
                            alert("Error przy ddoaniu komentarza: " + error)
                        }
                    );
                }
            }
    };
</script>