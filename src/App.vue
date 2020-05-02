<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light" style="background-color: #666699;" >
      <a href class="navbar-brand" @click.prevent>PackIT</a>
      <div class="collapse navbar-collapse d-flex justify-content-start" id="navbarNav">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/list" class="nav-link">
            <font-awesome-icon icon="plus"/>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/BoardUser" class="nav-link">
            <font-awesome-icon icon="home"/>
          </router-link>
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
          <router-link to="/google" class="nav-link">
            <font-awesome-icon :icon="['fab', 'google']" />
            </router-link>
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
