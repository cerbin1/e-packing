<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                <strong>{{currentUser.username}}</strong> this is logged user
            </h3>
        </header>

        <h2>{{content}}</h2>
    </div>
</template>

<script>
    import UserService from "@/services/user.service";

    export default {
        name: 'ExampleUserNotes',
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
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
