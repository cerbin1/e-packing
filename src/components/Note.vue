<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                <strong>{{currentUser.username}}</strong> this is logged user
                <strong>{{Object}}</strong> this my note
            </h3>
           
        </header>
      
    </div>
</template>

<script>
    import UserService from "@/services/user.service";

    export default {
        
        name: 'Note',
        
    props: {
        exampleProp: Object
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