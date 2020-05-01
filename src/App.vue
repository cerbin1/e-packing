<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light" style="background-color: #ff8533;" >
      <a href class="navbar-brand" @click.prevent>PackIT</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/list" class="nav-link">
            Add List
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/BoardUser" class="nav-link">
            <font-awesome-icon />All notes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/exampleUserNotes" class="nav-link">Example user notes</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/google" class="nav-link">Google</router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
