let m = document.querySelector(".manager");
let $;

let s = new Schools();

s.getArray()
  .then(list => {
    $ = manager(document.querySelector(".manager"), list, {
      onSave(data, modifiedEntites) {
        if (data.length == 0) return;

        s.save(data)
          .then(() => {
            s.getArray().then(list => $.update(list));
          })
          .catch(errors => {
            alert("Не удалось обновить");
            console.log(errors);
          });
      },
      onDelete(id, row) {
        s.delete(id)
          .then(() => row.parentNode.removeChild(row))
          .catch(errors => {
            alert("Не удалось удалить.");
            console.log(resp.errors);
          });
      }
    });
  });
