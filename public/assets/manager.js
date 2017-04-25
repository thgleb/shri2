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