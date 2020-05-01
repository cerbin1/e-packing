<template>
  <div class="container">
    <header class="jumbotron">
      <h2 class="text-center">
        <strong>Logged user: {{currentUser.username}}</strong>
      </h2>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
