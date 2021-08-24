<template>
  <div class="page-container">
    <Header />
    <div class="content">
      <template>
        <section>
          <b-field grouped>
            <b-field label="Expression">
              <b-input v-model="expression" placeholder="eg. 2 + 3"></b-input
            ></b-field>
            <b-field label="Result">
              <b-input disabled :value="result"></b-input
            ></b-field>
          </b-field>

          <b-field grouped>
            <p class="control">
              <b-button
                label="Calculate"
                @click="calculate"
                type="is-primary"
              />
            </p>
          </b-field>
        </section>
      </template>
    </div>
  </div>
</template>
    </div>
    </div>
</template>

<script>
import { evaluate } from "mathjs";
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },

  data() {
    return {
      result: "",
      expression: "",
    };
  },

  methods: {
    calculate() {
      let result = "";
      try {
        result = evaluate(this.expression);
      } catch (e) {
        this.$buefy.toast.open({
          duration: 3000,
          message: `<b>Expression</b> error`,
          position: "is-top",
          type: "is-danger",
        });
        return;
      }
      if (result == Infinity) {
        this.result = "undefined: dividing by zero";
      } else {
        this.result = result;
      }

      this.$http
        .post(
          "http://127.0.0.1:3333/api/history",
          {
            expression: this.expression,
            result: this.result,
          },
          {
            headers: {
              Authorization: localStorage.getItem("auth_token"),
            },
          }
        )
        .catch((error) =>
          this.$buefy.toast.open({
            duration: 5000,
            message: `Something went <b>Wrong</b>`,
            position: "is-top",
            type: "is-danger",
          })
        );
    },
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
.control {
  margin-top: 1rem;
}
</style>
