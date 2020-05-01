<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
Moja podróż do <strong>{{content.name}}</strong>
               
                    <table class="table table-striped">
                         
  <thead>
    <tr>
     
      <th>Kraj</th>
       <th>Miasto</th>
       <th>Od:</th>
       <th>Do:</th>
    </tr>
  </thead>
  <tbody>
    <tr>       
       <td>{{content.country}}</td> 
       <td>{{content.city}}</td>   
       <td>{{content.dateFrom}}</td>  
       <td>{{content.dateTo }}</td>  
    </tr>
   </tbody>
</table>
               
                         <div>
                         <table class="table table-striped">
  <thead>
    <tr>
      <th>Potrzebne przedmioty:</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in content.items" :key="item.id">
       <th scope="row">{{ item.name  }}</th>  
       <td>{{  item.count }}</td> 
       <td>{{  item.dateFrom }}</td>  
       <td>{{  item.dateTo }}</td>  
    </tr>
   </tbody>
</table>
</div>
       

            </h3>
            <router-link :to="{ name: 'user'}">Pokaż wszystkkie</router-link>

        </header>

        <label>
            Komentarz do notatki
            <input v-model="commentValue" type="text">
        </label>
        <button type="submit" @click.stop.prevent="saveComment()" class="btn btn-primary">zapisz komentarz</button>
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
                content: '',
                commentValue: ''
            };
        },
        mounted() {
            if (this.currentUser) {
                UserService.getOneNote(this.exampleProp).then(
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
        },
        methods:
            {
                saveComment() {
                    UserService.updateComment(this.content.id, this.commentValue).then(
                        () => {
                            alert("pomyslnie zapisano komentarz");
                            this.content.comment = this.commentValue;
                            this.commentValue = ''
                        },
                        error => {
                            alert("Error przy ddoaniu komentarza: " + error)
                        }
                    );
                }
            }
    };
</script>