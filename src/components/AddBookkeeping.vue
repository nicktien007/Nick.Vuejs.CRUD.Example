<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="detail.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="detail.description"
          name="description"
        />
      </div>

      <button @click="saveBookkeeping" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBookkeeping">Add</button>
    </div>
  </div>
</template>

<script>
import BookkeepingDataService from "../services/BookkeepingDataService";

export default {
  name: "add-bookkeeping",
  data() {
    return {
      detail: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveBookkeeping() {
      var data = {
        title: this.detail.title,
        description: this.detail.description
      };

      BookkeepingDataService.create(data)
        .then(response => {
          this.detail.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newBookkeeping() {
      this.submitted = false;
      this.detail = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
