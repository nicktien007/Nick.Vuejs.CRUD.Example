<template>
  <div class="list row">
    <div class="col-md-10">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Bookkeeping List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(b, index) in bookkeepings"
          :key="index"
          @click="setItemActive(b, index)"
        >
          <br>{{b.Kind}}
          <br>{{b.Location}}
          <br>{{ b.Address }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllList">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBookkeeping">
        <h4>Detail</h4>
        <div>
          <label><strong>Kind:</strong></label> {{ currentBookkeeping.Kind }}
        </div>
        <div>
          <label><strong>Location:</strong></label> {{ currentBookkeeping.Location }}
        </div>
        <div>
          <label><strong>Address:</strong></label> {{ currentBookkeeping.Address }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentBookkeeping.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/bookkeeping/' + currentBookkeeping.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Item...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookkeepingDataService from "../services/BookkeepingDataService";

export default {
  name: "bookkeeping-list",
  data() {
    return {
      bookkeepings: [],
      currentBookkeeping: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveBookkeepings() {
      BookkeepingDataService.getAll()
        .then(response => {
          this.bookkeepings = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBookkeepings();
      this.currentBookkeeping = null;
      this.currentIndex = -1;
    },

    setItemActive(item, index) {
      this.currentBookkeeping = item;
      this.currentIndex = index;
    },

    removeAllList() {
      BookkeepingDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      BookkeepingDataService.findByTitle(this.title)
        .then(response => {
          this.bookkeepings = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveBookkeepings();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
