package models

type Room struct {
  Id       int    `json:"id"`
  Name     string `json:"name"`
  Capacity int    `json:"stud_capacity"`
  Location string `json:"location"`
}

func (r Room) Save() (err error) {
  var sql string
  if r.Id > 0 {
    sql = `
      UPDATE
        rooms
      SET
        name = ?,
        stud_capacity = ?,
        location = ?
      WHERE
        id = ?
    `
  } else {
    sql = `
      INSERT INTO rooms (
        name, stud_capacity, location, id
      ) VALUES (?, ?, ?, ?)
    `
  }

  stmt, err := db.Prepare(sql)
  if err != nil {
    return
  }

  var id interface{}
  if r.Id > 0 {
    id = r.Id
  }

  res, err := stmt.Exec(
    r.Name,
    r.Capacity,
    r.Location,
    id,
  )
  if err != nil {
    return err
  }

  if r.Id == 0 {
    id, _ := res.LastInsertId()
    r.Id = int(id)
  }

  return
}

func (r Room) Delete() (status bool, err error) {
  stmt, err := db.Prepare("DELETE FROM rooms WHERE id = ?")
  if err != nil {
    return
  }

  res, err := stmt.Exec(r.Id)
  if err != nil {
    return
  }

  affect, err := res.RowsAffected()
  if err != nil {
    return
  }

  status = affect > 0
  return
}

func GetRooms() (rooms []Room, err error) {
  rows, err := db.Query("SELECT * FROM rooms")
  if err != nil {
    return
  }
  defer rows.Close()

  for rows.Next() {
    room := Room{}

    err = rows.Scan(
      &room.Id,
      &room.Name,
      &room.Capacity,
      &room.Location,
    )
    if err != nil {
      return
    }

    rooms = append(rooms, room)
  }

  return
}