<template>
    <div class="col-md-12">
        <header class="jumbotron">
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
       
            <router-link :to="{ name: 'user'}">Show all notes</router-link>

        </header>
        <button type="submit" @click.stop.prevent="copyToGoogleKeep()" class="btn btn-primary btn-block">Copy for Google Kepp</button>

            <div class="form-group">
  <label for="comment">Comment:</label>
  <textarea v-model="commentValue" class="form-control" rows="5" id="comment"></textarea>
</div>
      
        <button type="submit" @click.stop.prevent="saveComment()" class="btn btn-primary btn-block">Save comment</button>
        <div
            v-if="success"
            class="alert alert-success"
            role="alert"
          >Comment added</div>
        <div
                v-if="fail"
                class="alert alert-danger"
                role="alert"
        >Error while adding comment</div>
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
                commentValue: '',
                success: false,
                fail: false
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
                            this.success = true;
                            this.content.comment = this.commentValue;
                            this.commentValue = ''
                        },
                        error => {
                            console.log(error);
                    this.fail = true;
                        }
                    );
                },
                copyToGoogleKeep() {
                    let itemsToCopy = '';
                    this.content.items.forEach(item => itemsToCopy += item.name + ' ' + item.count + '\n');
                    navigator.clipboard.writeText(itemsToCopy.toString()).then(function () {
                        alert("List of items is ready to copy to Google Keep");
                    }, function () {
                        alert("Could not copy");
                    });
                }
            }
    };
</script>