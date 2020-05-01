<template>
  <div class="col-md-12">
    <div class="card card-container">
        <form name="form">
              <div class="form-group">
                    <label for="name" style="font-size:24px"><font-awesome-icon icon="atlas" style="font-size:24px"/> Title</label>
                      <input
                          v-model="name"
                          v-validate="'required|min:4|max:25'"
                          type="text"
                          class="form-control"
                          name="name"
                      />
                     <div
                        v-if="submitted && errors.has('title')"
                        class="alert-danger"
                     >{{errors.first('title')}}
                     </div>
                </div>
                <div class="form-group">
                    <label for="city" style="font-size:20px"><font-awesome-icon icon="city" style="font-size:20px"/> City</label><br />
                      <select v-model="city">
                        <option disabled value="">Please select City</option>
                        <option v-for='c in Cities' v-validate="'required'" :key="c.id" v-bind:value="{ id: c.id, city_name: c.name, country: c.country}">{{ c.name }}</option>
                      </select>  
                </div>
                <div class="form-group">
                    <label for="dfrom" style="font-size:20px"><font-awesome-icon icon="calendar-alt" style="font-size:20px"/> Start date</label><br />
                        <input 
                          type="date" 
                          v-model="dfrom" 
                          v-validate="'required'"
                          id="start" 
                          value="2020-01-22"
                          min="2020-04-01" 
                          max="2020-06-31">
                </div>
                <div class="form-group">
                  <label for="dto" style="font-size:20px"><font-awesome-icon icon="calendar-alt" style="font-size:20px"/> End date </label><br />
                    <input 
                      type="date" 
                      v-model="dto" 
                      id = "end"
                      v-validate="'required'"
                      value="2020-01-22"
                      min="2020-04-01" 
                      max="2020-06-31">
                </div>

                <div class="form-group">
                    <label for="mountains" style="font-size:18px"><font-awesome-icon icon="mountain" style="font-size:18px"/> Mountain trip&nbsp;</label>
                    <input 
                        type="checkbox" 
                        v-model="mountain">
                </div>
                <div class="form-group">
                    <label for="beach" style="font-size:18px"><font-awesome-icon icon="umbrella-beach" style="font-size:18px"/> Beach&nbsp;</label>
                    <input 
                        type="checkbox" 
                        v-model="beach">
                </div>
            <button type="submit" @click.stop.prevent="HandleListCreation()" class="btn btn-primary">Create note</button>
        </form>
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
      ap: null,
      name: '',
      city: '',
      dfrom: new Date(),
      dto: new Date(),
      submitted: false,
      temp: 0,
      beach: false,
      mountain: false,
      message: '',
      diff: 0,
      comment: '',
      items: [{name: "Beautician", count: 1},{name: "Comfortable shoes", count: 1},{name: "First aid kit", count: 1},{name: "Pajamas", count: 1},{name: "Slippers", count: 1},{name: "Towel", count: 1}]
    };
  },
  

  methods:{
    
     HandleListCreation() {
      //depends on day
      var d1 = new Date(this.dfrom);
      var d2 = new Date(this.dto);
      this.diff = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
      this.items.push({name: "Socks", count: this.diff},{name: "Underwear", count: this.diff},{name: "Pants / skirt / dress", count: this.diff},{name: "Singlets / shirts", count: this.diff});
      //gory
      if(this.mountain == true){
           this.items.push({name: "Mountain shoes", count: 1},{name: "Thermoactive clothes", count: 1},{name: "Backpack", count: 1});
       }
      //plaza
      if(this.beach == true){
        this.items.push({name: "Swimsuit", count: 1},{name: "Sunglasses", count: 1},{name: "Cream with filter", count: 1});
     }
     //temperatura
     axios
        .get('https://api.openweathermap.org/data/2.5/weather',{
          params: {
            id: this.city.id, 
            appid: '19d1c1955abe7831267d6cccbf9735f1' //tu juz jest nasz api key id
          }
        })
        .then((response) => {this.ap = response.data; 
                            this.temp = response.data.main.temp;
                            if(response.data.weather[0].main == "Rain"){
                              this.items.push({name: "Umbrella / raincoat", count: 1}); }
                           })
      //dodanie itemow w zalemosci od pogody
      if((this.temp - 273.15 ) < 20){
        this.items.push({name: "Sweatshirt / sweater", count: this.diff},{name: "Jacket", count: 1})
      }
      if ((this.temp - 273.15 ) < 5){
        this.items.push({name: "Hat", count: 1},{name: "Gloves", count: 1},{name: "Scarf", count: 1})
      }

      var user = JSON.parse(localStorage.getItem('user'));
      console.log(localStorage.getItem('user'));
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
       if (isValid) {
          axios({
              method: 'post',
              url: 'http://localhost:8081/notes/createUserNote?userId=' + user.id,
              headers: authHeader(),
              data: {
                  name: this.name,
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
                  this.$router.push('/BoardUser');
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
    max-width: 500px !important;
    padding: 25px 25px;
  }


</style>