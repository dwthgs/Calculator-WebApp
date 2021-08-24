<template>
  <div class="page-container">
    <Header />
    <div class="content">
      <b-table :data="data" :columns="columns"></b-table>
    </div>
  </div>
</template>


<script>
import js_ago from "js-ago";
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
        },
        {
          field: "expression",
          label: "Expression",
          centered: true,
        },
        {
          field: "result",
          label: "Result",
          centered: true,
        },
        {
          field: "created_at",
          label: "Time",
          centered: true,
        },
      ],
    };
  },

  mounted() {
    this.$http
      .get("http://127.0.0.1:3333/api/history", {
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((result) => {
        console.log(result);
        result.data.forEach((history) => {
          history.created_at = js_ago(new Date(history.created_at));
          this.data.push(history);
        });
      })
      .catch((error) =>
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went <b>Wrong</b>`,
          position: "is-top",
          type: "is-danger",
        })
      );
  },
};
</script>


<style scoped>
.page-container {
  padding: 0 12%;
}
.content {
  min-height: 25%;
  min-width: 25%;
  padding: 0 2rem;
  margin: 5rem auto;
}
</style>