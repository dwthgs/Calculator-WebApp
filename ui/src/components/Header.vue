<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="../assets/logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#/"> Home | Calculator </b-navbar-item>
      <b-navbar-item href="#/history"> History </b-navbar-item>
      <b-navbar-item href="#/profile"> Profile </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="name ? name : first_name">
          <b-navbar-item @click="logout"> Logout </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: {
    name: "",
  },
  data() {
    return {
      first_name: "",
    };
  },

  created() {
    this.$http
      .get("http://127.0.0.1:3333/api/profile", {
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((result) => {
        const { first_name } = result.data;
        this.first_name = first_name;
      });
  },

  methods: {
    logout() {
      localStorage.removeItem("auth_token");
      this.$router.push("/login");
    },
  },
};
</script>
