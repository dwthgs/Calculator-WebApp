<template>
  <div class="container">
    <div class="authform">
      <h1 class="title">Login</h1>
      <template>
        <section>
          <b-field
            label="Username / Nick"
            :type="errors.nick ? 'is-danger' : ''"
            :message="errors.nick ? errors.nick : ''"
          >
            <b-input v-model="nick" @keyup.stop.native="validateNick"></b-input>
          </b-field>

          <b-field
            label="Password"
            :type="errors.password ? 'is-danger' : ''"
            :message="errors.password ? errors.password : ''"
          >
            <b-input
              type="password"
              v-model="password"
              @keyup.stop.native="validatePassword"
              password-reveal
            >
            </b-input>
          </b-field>

          <b-button @click="login" class="btn" type="is-primary" expanded
            >Login</b-button
          >
          <p>
            Not register yet? <router-link to="/register">Register</router-link>
          </p>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import { validName, validPassword } from "../validator";
export default {
  data() {
    return {
      nick: "",
      password: "",
      errors: {
        nick: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      this.validateNick();
      this.validatePassword();
      if (!this.errors.nick && !this.errors.password) {
        this.$http
          .post("http://127.0.0.1:3333/api/login", {
            nick: this.nick,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("auth_token", "Bearer " + response.data.token);
            this.$router.push({ path: "/" });
          })
          .catch((error) =>
            this.$buefy.toast.open({
              duration: 5000,
              message: `Invalid <b>Credentials</b>`,
              position: "is-top",
              type: "is-danger",
            })
          );
      }
    },
    validateNick() {
      if (!validName(this.nick)) {
        this.errors.nick = "This username is invalid";
      } else {
        this.errors.nick = "";
      }
    },
    validatePassword() {
      if (!validPassword(this.password)) {
        this.errors.password =
          "Password must contain at least 8 characters (uppercase, lowercase and number)";
      } else {
        this.errors.password = "";
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.authform {
  width: 450px;
  height: 500px;
  text-align: left;
  padding: 3rem 1rem;
}
.btn {
  margin: 1.5rem 0;
}
</style>