<template>
    <div class="container responsive">
        <header class="jumbotron">
            <h3>
My trip <strong>{{content.name}}</strong>
               
                    <table class="table table-striped">
                         
  <thead>
    <tr>
     
      <th>Country</th>
       <th>City</th>
       <th>From</th>
       <th>To</th>
    </tr>
  </thead>
  <tbody>
    <tr>       
       <td>{{content.country}}</td> 
       <td>{{content.city}}</td>   
       <td>{{content.dateFrom}}</td>  
       <td>{{content.dateTo}}</td>  
    </tr>
   </tbody>
</table>
               
                         <div>
                         Comment:<div class="container p-3 my-3 border bg-white text-black">{{content.comment}}</div>
                         <table class="table table-striped">
  <thead>
    <tr>
      <th>List of needed items:</th>
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
            <router-link :to="{ name: 'user'}">Show all notes</router-link>

        </header>
        <button type="submit" @click.stop.prevent="copyToGoogleKeep()" class="btn btn-primary btn-block">Copy for Google Kepp</button>

            <div class="form-group">
  <label for="comment">Comment:</label>
  <textarea v-model="commentValue" class="form-control" rows="5" id="comment"></textarea>
</div>
      
        <button type="submit" @click.stop.prevent="saveComment()" class="btn btn-primary btn-block">Save comment</button>
        <div
            v-if="saveComment"
            class="alert alert-primary"
            role="alert"
          >Comment added</div>
    </div>
</template>
<style scoped>
/*.responsive {
    padding: 0 6px;
    float: left;
    width: 24.99999%;
}*/

@media only screen and (max-width: 700px) {
    .responsive {
        width: 49.99999%;
        margin: 6px 0;
    }
}

@media only screen and (max-width: 500px) {
    .responsive {
        width: 100%;
    }
}
</style>

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
                },
                copyToGoogleKeep() {
                    let itemsToCopy = '';
                    this.content.items.forEach(item => itemsToCopy += item.name + ' ' + item.count + '\n');
                    navigator.clipboard.writeText(itemsToCopy.toString()).then(function () {
                        alert("Gotowe do wklejenia do Google Kepp");
                    }, function () {
                        alert("Could not copy");
                    });
                }
            }
    };
</script>