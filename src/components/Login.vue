<template>
  <section class="form-elegant center">
     <img alt="Vue logo" src="./b.jpg" class="rounded mx-auto d-block">
     <form name="form" @submit.prevent="handleLogin">
    <mdb-row class="justify-content-center">
     
      <mdb-col md="5">
        <mdb-card>
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5"><strong>PackIT</strong></h3>
            </div>
            <div class="text-center mb-3">
              <div>
                  <label for="username">Username</label>
          <input
            v-model="user.username"
            v-validate="'required|min:4|max:25'"
            type="text"
            class="form-control"
            name="username"
          />
              <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
            <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required|min:6|max:40'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Please enter password!!</div>
              </div>
              </div>  
               <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div> 
          <div v-if="message" class="alert alert-danger text-center" role="alert">{{message}}</div>
          </mdb-card-body>
          <mdb-modal-footer class="mx-5 pt-3 mb-1 text-left">
              <h5 class="dark-grey-text mb-5 text-center">Make packing easy</h5>
          </mdb-modal-footer>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    </form>
  </section>
</template>
<style>
  .form-elegant .font-small {
    font-size: 0.8rem; }
  .form-elegant .z-depth-1a {
    -webkit-box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25);
    box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25); }
  .form-elegant .z-depth-1-half,
  .form-elegant .btn:hover {
    -webkit-box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15);
    box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15); }
</style>

<script>
import User from '../models/user';
 import { mdbRow, mdbCol, mdbCard, mdbCardBody, 
  //mdbInput, 
  //mdbBtn, 
  //mdbIcon, 
  //mdbModal, 
  //mdbModalBody, 
  mdbModalFooter } from 'mdbvue';

export default {
  name: 'Login',
      components: {
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody,
      //mdbInput,
      //mdbBtn,
      //mdbIcon,
      //mdbModal,
      //mdbModalBody,
      mdbModalFooter,
    
    },
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.message = '';
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
          
            () => {
              this.$router.push('/boarduser');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
  label {
    display: block;
    margin-top: 15px;
  }

  .card-container.card {
    max-width: 400px !important;
    padding: 25px 25px;
  }

  .card {
    background-color: lightblue;
    padding: 20px 25px 30px;
    margin: 25px 50px 25px;
  }
</style>
