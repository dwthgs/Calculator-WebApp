<template>
  <div class="container">
    <h1 class="title">404</h1>
    <h2>PAGE NOT FOUND</h2>
    <b-button class="btn" @click="backHome" type="is-primary" expanded
      >Back to Home</b-button
    >
  </div>
</template>

<style scoped>
.container {
  padding: 20% 30%;
}
.btn {
  margin-top: 2rem;
}
</style>

<script>
export default {
  methods: {
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>
