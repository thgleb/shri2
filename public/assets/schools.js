let m = document.querySelector(".manager");
let $;

Schools.getArray()
  .then(list => {
    $ = manager(document.querySelector(".manager"), list, {
      onSave(data, modifiedEntites) {
        if (data.length == 0) return;

        Schools.save(data)
          .then(() => {
            Schools.getArray().then(list => $.update(list));
          })
          .catch(errors => {
            alert("Не удалось обновить");
            console.log(errors);
          });
      },
      onDelete(id, row) {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", e => {
          let resp = JSON.parse(xhr.responseText);

          if (resp.error) {
            alert("Не удалось удалить.");
            console.log(resp.errors);
            return;
          }

          row.parentNode.removeChild(row);
        });

        xhr.open("delete", "/api/schools/" + id, true);
        xhr.send();
      }
    });
  });
