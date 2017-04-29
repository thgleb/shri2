class RestObject {
  constructor() {
    this.API_LINK = "/api/objects"; // must be changed
  }

  /**
   * It returns a list of objects.
   * @return Array
   */
  getArray() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (xhr.status === 200) {
          return resolve(resp.data || []);
        }

        reject(xhr);
      });

      xhr.open("get", this.API_LINK, true);
      xhr.send();
    });
  }

  /**
   * It saves the objects
   */
  save(data) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (resp.errors && resp.errors.length > 0) {
          return reject(resp.errors);
        }

        resolve();
      });

      xhr.open("POST", this.API_LINK, true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send("data=" + JSON.stringify(data));
    });
  }

  /**
   * It deletes an object
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (resp.error) {
          return reject(resp.error);
        }

        resolve();
      });

      xhr.open("delete", this.API_LINK + "/" + id, true);
      xhr.send();
    });
  }
}

class Schools extends RestObject {
  constructor() {
    super();
    this.API_LINK = "/api/schools";
  }

  save(data) {
    data.map(v => {
      v.id = parseInt(v.id);
    });

    return super.save(data);
  }
}

class Rooms extends RestObject {
  constructor() {
    super();
    this.API_LINK = "/api/rooms";
  }

  save(data) {
    data.map(v => {
      v.id = parseInt(v.id) || 0;
      v.stud_capacity = parseInt(v.stud_capacity);
    });

    return super.save(data);
  }
}

class Teachers extends RestObject {
  constructor() {
    super();
    this.API_LINK = "/api/teachers";
  }

  save(data) {
    data.map(v => {
      v.id = parseInt(v.id) || 0;
    });

    return super.save(data);
  }
}