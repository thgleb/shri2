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
        Schools.delete(id)
          .then(() => row.parentNode.removeChild(row))
          .catch(errors => {
            alert("Не удалось удалить.");
            console.log(resp.errors);
          });
      }
    });
  });
