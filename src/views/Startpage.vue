<template>
  <section class="form-elegant center">
    <mdb-row class="justify-content-center">
      <mdb-col md="5">
        <mdb-card>
          <mdb-card-body class="mx-4">
            <div class="text-center">
              <h3 class="dark-grey-text mb-5"><strong>E-packing</strong></h3>
            </div>
            <div class="text-center mb-3">
              <div>
                <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              </div>
              <mdb-btn v-on:click="redirectUser" type="submit" gradient="peach" rounded class="btn-block z-depth-1a">Login</mdb-btn>
              <button @click="redirectUser">dupa</button>
            </div>
            <div class="text-center mb-3">
              <mdb-btn v-on:click="login()" type="submit" gradient="peach" rounded class="btn-block z-depth-1a">Register</mdb-btn>
            </div>
                 
          </mdb-card-body>
          <mdb-modal-footer class="mx-5 pt-3 mb-1">
          <h12 class="dark-grey-text mb-5">Make packing easy</h12>
          </mdb-modal-footer>
        </mdb-card>
      </mdb-col>
    </mdb-row>
     <div>
                <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              </div>
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
  
  

  import { mdbRow, mdbCol, mdbCard, mdbCardBody, 
  //mdbInput, 
  mdbBtn, 
  //mdbIcon, 
  //mdbModal, 
  //mdbModalBody, 
  mdbModalFooter } from 'mdbvue';
  
  export default {
    name: 'FormsPage',
    components: {
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody,
      //mdbInput,
      mdbBtn,
      //mdbIcon,
      //mdbModal,
      //mdbModalBody,
      mdbModalFooter,
    
    },
    props: {
    onClick: {
      type: Function,
      required: true
    }
  },
    methods: {
      redirectUser() { // this method is called on button click
         {
            this.$router.go('/login')
         }
      }
    },
    data() {
      return {
        showModal: false
      };
    }
  }

</script>