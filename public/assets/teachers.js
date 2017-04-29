let m = document.querySelector(".manager");
let $;

let t = new Teachers();

t.getArray()
  .then(list => {
    $ = manager(document.querySelector(".manager"), list, {
      onSave(data, modifiedEntites) {
        if (data.length == 0) return;

        t.save(data)
          .then(() => {
            t.getArray().then(list => $.update(list));
          })
          .catch(errors => {
            alert("Не удалось обновить");
            console.log(errors);
          });
      },
      onDelete(id, row) {
        t.delete(id)
          .then(() => row.parentNode.removeChild(row))
          .catch(errors => {
            alert("Не удалось удалить.");
            console.log(resp.errors);
          });
      }
    });
  });
