<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
               
                <strong>{{exampleProp}}</strong> this my note id

                   <ul id="example-1">
            <li v-for="item in content" :key="item.id">
                notatka o id: {{exampleProp}}
                <ul>
                    <li>
                        nazwa notatki: {{ exampleProp.name }}
                    </li>
                    <li>
                        kraj: {{ item.country }}
                    </li>
                    <li>
                        miasto: {{ item.city }}
                    </li>
                    <li>
                        komentarz: {{ item.comment }}
                    </li>
                    <li>
                        data od: {{ item.dateFrom }}
                    </li>
                    <li>
                        data do: {{ item.dateTo }}
                    </li>
                    <li>
                        przedmioty: {{ item.items }}
                    </li>
                </ul>
            </li>
        </ul>
            
                
            </h3>
            <router-link :to="{ name: 'user'}">Pokaż wszystkkie</router-link>
           
        </header>
      
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
                content: ''
            };
        },
        mounted() {
            if (this.currentUser) {
                UserService.getOneNote().then(
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
        }
    };
</script>