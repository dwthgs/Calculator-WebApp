<template>
  <div class="container">
    <div class="authform">
      <h1 class="title">Register</h1>
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
            label="First Name"
            :type="errors.first_name ? 'is-danger' : ''"
            :message="errors.first_name ? errors.first_name : ''"
          >
            <b-input
              v-model="first_name"
              @keyup.stop.native="validateFirstName"
            ></b-input>
          </b-field>

          <b-field
            label="Last Name"
            :type="errors.last_name ? 'is-danger' : ''"
            :message="errors.last_name ? errors.last_name : ''"
          >
            <b-input
              v-model="last_name"
              @keyup.stop.native="validateLastName"
            ></b-input>
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

          <b-button @click="register" class="btn" type="is-primary" expanded
            >Register</b-button
          >
          <p>
            Already have an account?
            <router-link to="/login">Login</router-link>
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
      first_name: "",
      last_name: "",
      password: "",
      errors: {
        nick: "",
        first_name: "",
        last_name: "",
        password: "",
      },
    };
  },

  methods: {
    register() {
      this.validateNick();
      this.validateFirstName();
      this.validateLastName();
      this.validatePassword();
      if (
        !this.errors.nick &&
        !this.errors.password &&
        !this.errors.first_name &&
        !this.errors.last_name
      ) {
        this.$http
          .post("http://127.0.0.1:3333/api/register", {
            nick: this.nick,
            password: this.password,
            first_name: this.first_name,
            last_name: this.last_name,
          })
          .then((response) => {
            localStorage.setItem("auth_token", "Bearer " + response.data.token);
            this.$router.push({ path: "/" });
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.$buefy.toast.open({
                duration: 5000,
                message: `Nick is not <b>available</b>`,
                position: "is-top",
                type: "is-danger",
              });
            } else {
              this.$buefy.toast.open({
                duration: 5000,
                message: `Something went <b>Wrong</b>`,
                position: "is-top",
                type: "is-danger",
              });
            }
          });
      }
    },
    validateNick() {
      if (!validName(this.nick)) {
        this.errors.nick = "This username is invalid";
      } else {
        this.errors.nick = "";
      }
    },
    validateFirstName() {
      if (!validName(this.first_name)) {
        this.errors.first_name = "This name is invalid";
      } else {
        this.errors.first_name = "";
      }
    },
    validateLastName() {
      if (!validName(this.last_name)) {
        this.errors.last_name = "This name is invalid";
      } else {
        this.errors.last_name = "";
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
  /* background: #acacac; */
  width: 450px;
  height: 500px;
  text-align: left;
  padding: 1.5rem 1rem;
}
.btn {
  margin: 1.5rem 0;
}
</style>