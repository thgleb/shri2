package models

type School struct {
  Id            int    `json:"id"`
  Name          string `json:"name"`
  ShortName     string `json:"short_name"`
  Link          string `json:"link"`
  StudentsCount string `json:"students_count"`
}

func (s School) Save() (err error) {
  var sql string
  if s.Id > 0 {
    sql = `
      UPDATE
        schools
      SET
        name = ?,
        short_name = ?,
        link = ?,
        students_count = ?
      WHERE
        id = ?
    `
  } else {
    sql = `
      INSERT INTO schools (
        name, short_name,
        link, students_count,
        id
      ) VALUES (?, ?, ?, ?, ?)
    `
  }

  stmt, err := db.Prepare(sql)
  if err != nil {
    return
  }

  var id interface{}
  if s.Id > 0 {
    id = s.Id
  }

  res, err := stmt.Exec(
    s.Name,
    s.ShortName,
    s.Link,
    s.StudentsCount,
    id,
  )
  if err != nil {
    return err
  }

  if s.Id == 0 {
    id, _ := res.LastInsertId()
    s.Id = int(id)
  }

  return
}

func (s School) Delete() (status bool, err error) {
  stmt, err := db.Prepare("DELETE FROM schools WHERE id = ?")
  if err != nil {
    return
  }

  res, err := stmt.Exec(s.Id)
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

func GetSchools() (schools []School, err error) {
  rows, err := db.Query("SELECT * FROM schools")
  if err != nil {
    return
  }
  defer rows.Close()

  for rows.Next() {
    school := School{}

    err = rows.Scan(
      &school.Id,
      &school.Name,
      &school.ShortName,
      &school.Link,
      &school.StudentsCount,
    )
    if err != nil {
      return
    }

    schools = append(schools, school)
  }

  return
}