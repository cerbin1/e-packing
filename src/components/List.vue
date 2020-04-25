<template>
  <div class="col-md-12">
    <div class="card card-container">
        <form name="form">
            <div class="form-row">
              <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        v-model="title"
                        v-validate="'required|min:4|max:25'"
                        type="text"
                        class="form-control"
                        name="title"
                    />
                     <div
                        v-if="submitted && errors.has('title')"
                        class="alert-danger"
                     >{{errors.first('title')}}
                     </div><br/>
                </div>
                <div class="form-group">
                        <label for="dfrom">Start date</label>
                        <input type="date" v-model="dfrom" id="start">
                </div><br/>
						<div class="form-group">
							<label for="dto">End date</label>
							<input type="date" v-model="dto" id = "end">
						</div><br/>
            <button type="button" v-on:click="days()">Confirm Dates</button>
            <div class="form-group">
                    <label for="title">City</label>
                    <input
                        v-model="city"
                        v-validate="'required|min:4|max:25'"
                        type="text"
                        class="form-control"
                        name="city"
                    />
                     <div
                        v-if="submitted && errors.has('city')"
                        class="alert-danger"
                     >{{errors.first('city')}}
                     </div><br/>
            </div>
            <div class="form-group">
                <label for="mountains"></label>
                <input 
                    type="checkbox" 
                    v-model="mountain"
                    @change='mountains'>
                    Mountain trip
            </div><br/>
            <div class="form-group">
                <label for="beach"></label>
                <input 
                    type="checkbox" 
                    v-model="beach"
                    @change='tobeach'>
                    Beach/swimming pool
            </div><br/>
            </div>
            <button type="submit" class="btn btn-primary">Create note</button>
        </form>
        <div>
          <span>Title: {{title}}</span><br/>
          <span>Dfrom: {{dfrom}}</span><br/>
          <span>Dto: {{dto}}</span><br/>
          <span>Days: {{diff}}</span><br/>
          <span>List: {{ items }}</span>
        </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth/';
//import List from '../models/list';

export default {
  name: 'List',
  data() {
    return {
   //   list: new List('', '', '','', '', ''),
      submitted: false,
      message: '',
      diff: 0,
      comment: '',
      items: [{name: "Kosmetyczka", count: 1},{name: "Wygodne buty", count: 1},{name: "Apteczka", count: 1},{name: "Piżama", count: 1},{name: "Klapki", count: 1},{name: "Ręcznik", count: 1}]
    };
  },

  methods:{

    days() {
      var d1 = new Date(this.dfrom);
      var d2 = new Date(this.dto);
      this.diff = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
      this.items.push({name: "skarpetki", count: this.diff},{name: "bielizna", count: this.diff},{name: "spodnie/spódnica/sukienka", count: this.diff},{name: "podkoszulki/koszule", count: this.diff});
    }, 
    mountains() {
           this.items.push({name: "mounntain shoes", count: 1},{name: "termoactive clothes", count: 1},{name: "backpack", count: 1});
    },
    tobeach() { 
        this.items.push({name: "swimsuit", count: 1},{name: "sunglasses", count: 1},{name: "cream with filter", count: 1})
    },
/*
    handleListCreation() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/list', {
                this.title: title,
                this.city: city,
                this.dfrom: dfrom,
                this.dto: dto,
                this.items: items,
                this.comment: comment
           }).then(
            data => {
              this.message = data.message;
              this.successful = true;
              createList(){
                return axios.post(API_URL + 'list', {  
                }
              }
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
    } */
  }

	}

</script>

<style>


  .card-container.card {
    max-width: 400px !important;
    padding: 25px 25px;
  }

  .card {
    background-color: greenyellow;
    padding: 20px 25px 30px;
    margin: 25px 50px 25px;
  }
</style>