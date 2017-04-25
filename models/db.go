package models

import (
  "os"
  "database/sql"

  _ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

const DB_PATH = "database.sqlite3"

func OpenDbConn() (err error) {
  db, err = sql.Open("sqlite3", DB_PATH)
  return
}

func CloseDbConn() {
  db.Close()
}

func CreateScheme() (err error) {
  os.Remove(DB_PATH)

  stmts := []string{
    `CREATE TABLE classes (
      id INTEGER PRIMARY KEY,
      type varchar(50) NOT NULL,
      title varchar(150) NOT NULL,
      date date NOT NULL,
      time_period_start time NOT NULL,
      time_period_end time NOT NULL DEFAULT '00:00:00',
      room_id smallint(5) NOT NULL,

      CONSTRAINT unique_classes__id_room_id UNIQUE (id, room_id)
    )`,

    `CREATE TABLE classes_schools (
      class_id mediumint(8) NOT NULL,
      school_id tinyint(3) NOT NULL,

      FOREIGN KEY (class_id) REFERENCES classes (id),
      FOREIGN KEY (school_id) REFERENCES schools (id)
    )`,

    `CREATE TABLE classes_teachers (
      class_id mediumint(8) NOT NULL,
      teacher_id smallint(5) NOT NULL,

      FOREIGN KEY (class_id) REFERENCES classes (id),
      FOREIGN KEY (teacher_id) REFERENCES teachers (id)
    )`,

    `CREATE TABLE rooms (
      id INTEGER PRIMARY KEY,
      name varchar(100) NOT NULL,
      сapacity smallint(5) NOT NULL,
      location text NOT NULL
    )`,

    `CREATE TABLE schools (
      id INTEGER PRIMARY KEY,
      name varchar(100) NOT NULL,
      short_name varchar(100) NOT NULL,
      link varchar(50) NOT NULL,
      students_count smallint(5) NOT NULL
    )`,

    `CREATE TABLE teachers (
      id INTEGER PRIMARY KEY,
      first_name varchar(50) NOT NULL,
      last_name varchar(50) NOT NULL,
      description text NOT NULL,
      company_name varchar(100) NULL,
      company_link varchar(100) NULL
    )`,
  }

  tx, err := db.Begin()
  if err != nil {
    return
  }

  for i := range stmts {
    stmt, err := tx.Prepare(stmts[i])
    if err != nil {
      return err
    }

    _, err = stmt.Exec()
    if err != nil {
      return err
    }
  }
  tx.Commit()

  return
}