<template>
  <div class="page-container">
    <Header :name="first_name" />
    <div class="content">
      <div class="authform">
        <h1 class="title">Update Profile</h1>
        <template>
          <section>
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
                placeholder="------"
                @keyup.stop.native="validatePassword"
                password-reveal
              >
              </b-input>
            </b-field>

            <b-button @click="update" class="btn" type="is-primary" expanded
              >Update</b-button
            >
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { validName, validPassword } from "../validator";
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },

  data() {
    return {
      first_name: "",
      last_name: "",
      password: "",
      errors: {
        first_name: "",
        last_name: "",
        password: "",
      },
    };
  },

  methods: {
    update() {
      this.validateFirstName();
      this.validateLastName();
      this.validatePassword();
      if (
        !this.errors.password &&
        !this.errors.first_name &&
        !this.errors.last_name
      ) {
        this.$http
          .put(
            "http://127.0.0.1:3333/api/profile",
            {
              password: this.password,
              first_name: this.first_name,
              last_name: this.last_name,
            },
            {
              headers: {
                Authorization: localStorage.getItem("auth_token"),
              },
            }
          )
          .then((response) => {
            this.$buefy.toast.open({
              duration: 3000,
              message: `Profile <b>Updated</b>`,
              position: "is-top",
              type: "is-success",
            });
          })
          .catch((error) =>
            this.$buefy.toast.open({
              duration: 5000,
              message: `something went <b>Wrong</b>`,
              position: "is-top",
              type: "is-danger",
            })
          );
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
      if (this.password && !validPassword(this.password)) {
        this.errors.password =
          "Password must contain at least 8 characters (uppercase, lowercase and number)";
      } else {
        this.errors.password = "";
      }
    },
  },

  mounted() {
    this.$http
      .get("http://127.0.0.1:3333/api/profile", {
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((result) => {
        const { first_name, last_name } = result.data;
        this.first_name = first_name;
        this.last_name = last_name;
      });
  },
};
</script>


<style scoped>
.page-container {
  padding: 0 12%;
}
.content {
  min-height: 25%;
  width: 400px;
  padding: 0 2rem;
  margin: 5rem auto;
}
.btn {
  margin: 1.5rem 0;
}
</style>