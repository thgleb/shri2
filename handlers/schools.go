package handlers

import (
  "net/http"
  "encoding/json"
  "strconv"

  "github.com/thgleb/shri2/models"
  "github.com/julienschmidt/httprouter"
)

func GetSchools(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  schools, err := models.GetSchools()
  if err != nil {
    handleError(w, err, http.StatusInternalServerError)
    return
  }

  m, _ := json.Marshal(map[string]interface{}{"schools": schools})
  w.Write([]byte(m))
}

func DeleteSchool(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
  id, _ := strconv.Atoi(ps.ByName("id"))
  school := models.School{Id: id}

  status, err := school.Delete()
  if err != nil {
    handleError(w, err, http.StatusInternalServerError)
    return
  }

  m, _ := json.Marshal(map[string]interface{}{"status": status})
  w.Write([]byte(m))
}

func SaveSchools(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  r.ParseForm()

  var schools []models.School
  json.Unmarshal([]byte(r.Form.Get("data")), &schools)

  var errors []error

  for _, v := range schools {
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