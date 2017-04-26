let m = document.querySelector(".manager");
let $;

Rooms.getArray()
  .then(list => {
    $ = manager(document.querySelector(".manager"), list, {
      onSave(data, modifiedEntites) {
        if (data.length == 0) return;

        Rooms.save(data)
          .then(() => {
            Rooms.getArray().then(list => $.update(list));
          })
          .catch(errors => {
            alert("Не удалось обновить");
            console.log(errors);
          });
      },
      onDelete(id, row) {
        Rooms.delete(id)
          .then(() => row.parentNode.removeChild(row))
          .catch(errors => {
            alert("Не удалось удалить.");
            console.log(resp.errors);
          });
      }
    });
  });
