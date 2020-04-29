<template>
 <div id="app">
  <table class="table table-striped">
  <thead>
    <tr>
      <th>Moje notatki:</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item) in content" :key="item">
       <th scope="row">{{ item.name  }}</th>  
       <td>{{  item.country }}</td> 
       <td>{{  item.dateFrom }}</td>  
       <td>{{  item.dateTo }}</td>  
       <router-link  :to="{name: 'note', params: {noteid: item.id}}" class="nav-link" >Pokaż szczegóły</router-link>
       <router-link 
          :to="{ name: 'note', 
           params: { exampleProp: item.id }}">
              Link to My Component
       </router-link>
    </tr>
   </tbody>
</table>
</div>
</template>

<script>
    import UserService from "@/services/user.service";

    export default {
        name: 'ExampleUserNotes',
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        data() {
            return {
                content: ''
            };
        },
        mounted() {
            if (this.currentUser) {
                UserService.getAllNotes().then(
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
        }
    };
</script>