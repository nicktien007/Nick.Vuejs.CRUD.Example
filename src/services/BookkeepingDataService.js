import http from "../http-common";

class BookkeepingDataService {
  getAll() {
    // return http.get("/bookkeepings");
    return http.get("https://data.kcg.gov.tw/dataset/a98754a3-3446-4c9a-abfc-58dc49f2158c/resource/48d4dfc4-a4b2-44a5-bdec-70f9558cd25d/download/yopendata1070622opendatajson-1070622.json");
  }

  get(id) {
    return http.get(`/bookkeepings/${id}`);
  }

  create(data) {
    return http.post("/bookkeepings", data);
  }

  update(id, data) {
    return http.put(`/bookkeepings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bookkeepings/${id}`);
  }

  deleteAll() {
    return http.delete(`/bookkeepings`);
  }

  findByTitle(title) {
    return http.get(`/bookkeepings?title=${title}`);
  }
}

export default new BookkeepingDataService();
