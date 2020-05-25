<template>
    <div class="centered">
        <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
            Sign in with Google
        </g-signin-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                googleSignInParams: {
                    client_id: '385296006142-jpe1r7ath5bpj0bgcmtkpec9k42o4st6.apps.googleusercontent.com'
                }
            }
        },
        methods: {
            onSignInSuccess(googleUserInfo) {
                const profile = googleUserInfo.getBasicProfile();
                console.log(profile);
                let googleUserEmail = profile.Du;
                const googleUser = {email: googleUserEmail};

                this.$store.dispatch('auth/google', googleUser).then(
                    () => {
                        this.$router.push('/profile');
                    },
                    error => {
                        this.loading = false;
                        this.message =
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString();
                    }
                );
            },
            onSignInError(error) {
                console.log('Error with google login', error)
            }
        }
    }
</script>

<style>
    .centered {
        text-align: center;
    }

    .g-signin-button {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
        cursor: pointer;
    }
</style>
