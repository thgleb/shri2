package handlers

import (
  "net/http"
  "encoding/json"
  "strconv"

  "github.com/thgleb/shri2/models"
  "github.com/julienschmidt/httprouter"
)

func GetRooms(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  rooms, err := models.GetRooms()
  if err != nil {
    handleError(w, err, http.StatusInternalServerError)
    return
  }

  m, _ := json.Marshal(map[string]interface{}{"data": rooms})
  w.Write([]byte(m))
}

func DeleteRoom(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
  id, _ := strconv.Atoi(ps.ByName("id"))
  room := models.Room{Id: id}

  status, err := room.Delete()
  if err != nil {
    handleError(w, err, http.StatusInternalServerError)
    return
  }

  m, _ := json.Marshal(map[string]interface{}{"status": status})
  w.Write([]byte(m))
}

func SaveRooms(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  r.ParseForm()

  var rooms []models.Room
  json.Unmarshal([]byte(r.Form.Get("data")), &rooms)

  var errors []error

  for _, v := range rooms {
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