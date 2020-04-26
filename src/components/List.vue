<template>
  <div class="col-md-12">
    <div class="card card-container">
        <form name="form">
            <div class="form-row">
                 <div class="form-group">
                    <label for="city">City</label>
                    <select v-model="city">
                      <option disabled value="">Please select City</option>
                      <option v-for='c in Cities' v-validate="'required'" :key="c.id" v-bind:value="{ id: c.id, city_name: c.name, country: c.country}" @change = 'temperature()'>{{ c.name }}</option>
                    </select>  
                </div>
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
                        <input 
                          type="date" 
                          v-model="dfrom" 
                          v-validate="'required'"
                          id="start" 
                          value="2020-01-22"
                          min="2020-04-01" 
                          max="2020-06-31">
                </div><br/>
						<div class="form-group">
							<label for="dto">End date</label>
							<input 
                type="date" 
                v-model="dto" 
                id = "end"
                v-validate="'required'"
                value="2020-01-22"
                min="2020-04-01" 
                max="2020-06-31">
						</div><br/>
            <button type="button" v-on:click="days()">Confirm Dates</button>

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
            <button type="submit" v-on:click="HandleListCreation()" class="btn btn-primary">Create note</button>
        </form>
        <div>
          <span>Title: {{title}}</span><br/>
          <span>Dfrom: {{dfrom}}</span><br/>
          <span>Dto: {{dto}}</span><br/>
          <span>Days: {{diff}}</span><br/>
          <span>List: {{ items }}</span>
          <span>List: {{ city.city_name }}</span>
          <span>List: {{ city.id }}</span>
          <span>List: {{ info }}</span>
        </div>
        <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >{{message}}
        </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import authHeader from "@/services/auth-header";
import json from '@/json/citylist.json';

export default {
  name: 'List',
  data() {
    return {
      Cities: json,
      city_id: 0,
      info: null,
      title: '',
      city: '',
      dfrom: new Date(),
      dto: new Date(),
      //dateFrom: this.dfrom
      //dateTo: this.dto
      submitted: false,
      beach: false,
      mountain: false,
      message: '',
      diff: 0,
      comment: '',
      items: [{name: "Kosmetyczka", count: 1},{name: "Wygodne buty", count: 1},{name: "Apteczka", count: 1},{name: "Piżama", count: 1},{name: "Klapki", count: 1},{name: "Ręcznik", count: 1}]
    };
  },
  
  mounted(){
   // if(this.city.id > 0){
    this.temperature()
   // }
  },

  methods:{
    temperature(){
      //const API_URL = 'api.openweathermap.org/data/2.5/weather/';
      axios
        .get('api.openweathermap.org/data/2.5/weather/',{
          params: {
            id: '2172797',//this.city.id,
            appid: '439d4b804bc8187953eb36d2a8c26a02'
          }
        })
        .then(response => (this.info = response))
    },
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
     HandleListCreation() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
       if (isValid) {
          axios({
              method: 'post',
              url: 'http://localhost:8081/notes/create',
              headers: authHeader(),
              data: {
                  name: this.title,
                  city: this.city.city_name,
                  comment: this.comment,
                  dateFrom: this.dfrom,
                  dateTo: this.dto,
                  items: this.items,
                  country: this.city.country
              }
          }).then(
              response => {
                  this.content = response.data;
              },
              error => {
                  this.content =
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