<template>
  <div class="col-md-12">
    <div class="card card-container">
        <form name="form" @submit.prevent="handleRegister">
            <div class="form-row">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        v-model="user.username"
                        v-validate="'required|min:4|max:25'"
                        type="text"
                        class="form-control"
                        name="username"
                    />
                     <div
                        v-if="submitted && errors.has('username')"
                        class="alert-danger"
                     >{{errors.first('username')}}
                     </div>
                </div>
                <div class="form-group">
                    <label for="userEmail">Email</label>
                    <input
                        v-model="user.userEmail"
                        v-validate="'required|email|min:5|max:50'"
                        type="email"
                        class="form-control"
                        name="email"
                    />
                    <div
                        v-if="submitted && errors.has('email')"
                        class="alert-danger"
                    >{{errors.first('email')}}
                    </div>
                </div>
                <div class="form-group">
                    <label for="userpswd">Password</label>
                    <input
                        v-model="user.userpswd"
                        v-validate="'required|min:6|max:40'"
                        type="password"
                        class="form-control"
                        name="password"
                    />
                    <div
                        v-if="submitted && errors.has('password')"
                        class="alert-danger"
                    >{{errors.first('password')}}
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Register now</button>
        </form>
        </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>