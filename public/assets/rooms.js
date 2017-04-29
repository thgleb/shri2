let m = document.querySelector(".manager");
let $;

let r = new Rooms();

r.getArray()
  .then(list => {
    $ = manager(document.querySelector(".manager"), list, {
      onSave(data, modifiedEntites) {
        if (data.length == 0) return;

        r.save(data)
          .then(() => {
            r.getArray().then(list => $.update(list));
          })
          .catch(errors => {
            alert("Не удалось обновить");
            console.log(errors);
          });
      },
      onDelete(id, row) {
        r.delete(id)
          .then(() => row.parentNode.removeChild(row))
          .catch(errors => {
            alert("Не удалось удалить.");
            console.log(resp.errors);
          });
      }
    });
  });
