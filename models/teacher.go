package models

type Teacher struct {
  Id          int    `json:"id"`
  FirstName   string `json:"first_name"`
  LastName    string `json:"last_name"`
  Description string `json:"description"`
  CompanyName string `json:"company_name"`
  CompanyLink string `json:"company_link"`
}

func (t Teacher) Save() (err error) {
  var sql string
  if t.Id > 0 {
    sql = `
      UPDATE
        teachers
      SET
        first_name = ?,
        last_name = ?,
        description = ?,
        company_name = ?,
        company_link = ?
      WHERE
        id = ?
    `
  } else {
    sql = `
      INSERT INTO teachers (
        first_name, last_name,
        description, company_name,
        company_link, id
      ) VALUES (?, ?, ?, ?, ?, ?)
    `
  }

  stmt, err := db.Prepare(sql)
  if err != nil {
    return
  }

  var id interface{}
  if t.Id > 0 {
    id = t.Id
  }

  res, err := stmt.Exec(
    t.FirstName,
    t.LastName,
    t.Description,
    t.CompanyName,
    t.CompanyLink,
    id,
  )
  if err != nil {
    return err
  }

  if t.Id == 0 {
    id, _ := res.LastInsertId()
    t.Id = int(id)
  }

  return
}

func (t Teacher) Delete() (status bool, err error) {
  stmt, err := db.Prepare("DELETE FROM teachers WHERE id = ?")
  if err != nil {
    return
  }

  res, err := stmt.Exec(t.Id)
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

func GetTeachers() (teachers []Teacher, err error) {
  rows, err := db.Query("SELECT * FROM teachers")
  if err != nil {
    return
  }
  defer rows.Close()

  for rows.Next() {
    teacher := Teacher{}

    err = rows.Scan(
      &teacher.Id,
      &teacher.FirstName,
      &teacher.LastName,
      &teacher.Description,
      &teacher.CompanyName,
      &teacher.CompanyLink,
    )
    if err != nil {
      return
    }

    teachers = append(teachers, teacher)
  }

  return
}