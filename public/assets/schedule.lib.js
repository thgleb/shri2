class Schools {
  /**
   * It returns a list of schools.
   * @return Array
   */
  static getArray() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (xhr.status === 200) {
          return resolve(resp.schools || []);
        }

        reject(xhr);
      });

      xhr.open("get", "/api/schools", true);
      xhr.send();
    });
  }

  /**
   * It saves the schools
   */
  static save(data) {
    data.map(v => {
      v.id = parseInt(v.id)
    });

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (resp.errors && resp.errors.length > 0) {
          return reject(resp.errors);
        }

        resolve();
      });

      xhr.open("POST", "/api/schools", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send("data=" + JSON.stringify(data));
    });
  }

  /**
   * It deletes a school
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (resp.error) {
          return reject(resp.error);
        }

        resolve();
      });

      xhr.open("delete", "/api/schools/" + id, true);
      xhr.send();
    });
  }
}

class Rooms {
  /**
   * It returns a list of classrooms.
   * @return Array
   */
  static getArray() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (xhr.status === 200) {
          return resolve(resp.rooms || []);
        }

        reject(xhr);
      });

      xhr.open("get", "/api/rooms", true);
      xhr.send();
    });
  }

  /**
   * It saves the classrooms
   */
  static save(data) {
    data.map(v => {
      v.id = parseInt(v.id)
      v.stud_capacity = parseInt(v.stud_capacity)
    });

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (resp.errors && resp.errors.length > 0) {
          return reject(resp.errors);
        }

        resolve();
      });

      xhr.open("POST", "/api/rooms", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send("data=" + JSON.stringify(data));
    });
  }

  /**
   * It deletes a classroom
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", e => {
        let resp = JSON.parse(xhr.responseText);

        if (resp.error) {
          return reject(resp.error);
        }

        resolve();
      });

      xhr.open("delete", "/api/rooms/" + id, true);
      xhr.send();
    });
  }
}