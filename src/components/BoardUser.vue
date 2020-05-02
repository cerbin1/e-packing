<template>
 <div id="app">
 <h2>My notes</h2>
  <table class="table table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Country</th>
      <th>Date from</th>
      <th>Date to</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item) in content" :key="item">
       <th scope="row">{{ item.name  }}</th>
       <td>{{  item.country }}</td>
       <td>{{  item.dateFrom }}</td>
       <td>{{  item.dateTo }}</td>
        <td>
            <router-link
                    :to="{ name: 'note',
           params: { exampleProp: item.id }}">
                Show details
            </router-link>
        </td>
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
                UserService.getNotesByUserId(this.currentUser.id).then(
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