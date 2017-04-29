package handlers

import (
  "net/http"
  "encoding/json"
  "strconv"

  "github.com/thgleb/shri2/models"
  "github.com/julienschmidt/httprouter"
)

func GetTeachers(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  teachers, err := models.GetTeachers()
  if err != nil {
    handleError(w, err, http.StatusInternalServerError)
    return
  }

  m, _ := json.Marshal(map[string]interface{}{"data": teachers})
  w.Write([]byte(m))
}

func DeleteTeacher(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
  id, _ := strconv.Atoi(ps.ByName("id"))
  teacher := models.Teacher{Id: id}

  status, err := teacher.Delete()
  if err != nil {
    handleError(w, err, http.StatusInternalServerError)
    return
  }

  m, _ := json.Marshal(map[string]interface{}{"status": status})
  w.Write([]byte(m))
}

func SaveTeachers(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  r.ParseForm()

  var teachers []models.Teacher
  json.Unmarshal([]byte(r.Form.Get("data")), &teachers)

  var errors []error

  for _, v := range teachers {
    err := v.Save()
    if err != nil {
      errors = append(errors, err)
    }
  }

  if len(errors) > 0 {
    handleErrors(w, errors, http.StatusInternalServerError)
    return
  }

  m, _ := json.Marshal(map[string]interface{}{"status": true})
  w.Write([]byte(m))
}
