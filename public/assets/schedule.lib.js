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
}