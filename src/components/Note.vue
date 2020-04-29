<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
               
                <strong>{{exampleProp}}</strong> this my note id
                
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
                UserService.getAllNotes().then(
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