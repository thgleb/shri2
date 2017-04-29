/**
 * It maintains working process with data tables.
 *
 * @param HTMLElement container
 * @param Array       data
 * @param Object      config
 *
 */
function manager(container, data, config) {
  let dataSet = container.querySelector(".manager__dataset tbody"),
    newEntity = container.querySelector(".manager__new-entity"),
    saveEntites = container.querySelector(".manager__save-entities");

  let entityRowTemplate = container.querySelector(".manager__entity-row");

  // Create btn
  newEntity.addEventListener("click", e => dataSet.appendChild(createEntity()));

  // Save btn
  saveEntites.addEventListener("click", e => {
    let modifiedEntites = dataSet.querySelectorAll("[modified]"),
      d = [];

    for (ent of modifiedEntites) {
      let entData = {};
      entData.id = ent.getAttribute("id");

      for (column of ent.querySelectorAll("[data-key]")) {
        entData[column.getAttribute("data-key")] = column.value;
      }

      d.push(entData);
    }

    config.onSave(d, modifiedEntites);
  });

  // Create a row
  function createEntity(d) {
    let entity = entityRowTemplate.content.cloneNode(true),
      row = entity.querySelector("tr");

    row
      .querySelector(".manager__delete-entity")
      .addEventListener("click", deleteEntity);

    for (key in d) {
      let el = row.querySelector(`[data-key='${key}']`);
      el && (el.value = d[key]);

      if (key === "id") {
        row.setAttribute(key, d[key]);
      }
    }

    // Modified status
    for (i of row.querySelectorAll("input")) 
      i.addEventListener("change", e => row.setAttribute("modified", true));

    return entity;
  }

  // Delete a row
  function deleteEntity() {
    let row = this.parentNode.parentNode,
      id = row.getAttribute("id");

    if (!id) {
      return row.parentNode.removeChild(row);
    }

    config.onDelete(row.getAttribute("id"), row);
  }

  // Insert data
  function insert() {
    for (ent of data)
      dataSet.appendChild(createEntity(ent));
  }

  // Clear data
  function clear() {
    dataSet.innerHTML = "";
  }

  // Update data
  this.update = function(newData) {
    data = newData;

    clear();
    insert();
  };

  insert();
  return this;
}

/**
 * It simplifies work with the manager.
 *
 * @param HTMLElement container
 * @param Object      obj        One of the instances of ScheduleLib.
 */
function managerWrapper(container, obj) {
  let $;

  function onData(list) {
    $ = manager(container, list, { onSave, onDelete });
  }

  function onSave(data, modifiedEntites) {
    if (data.length == 0) return;

    obj.save(data)
      .then(() => obj.getArray().then(list => $.update(list)))
      .catch(errors => {
        alert("Не удалось обновить");
        console.log(errors);
      });
  }

  function onDelete(id, row) {
    obj.delete(id)
      .then(() => row.parentNode.removeChild(row))
      .catch(errors => {
        alert("Не удалось удалить.");
        console.log(errors);
      });
  }

  obj.getArray().then(onData);
}