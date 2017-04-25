package handlers

import (
  "net/http"
  "encoding/json"
)

func handleError(w http.ResponseWriter, err error, code int) {
  m, _ := json.Marshal(map[string]error{"error": err})

  w.WriteHeader(code)
  w.Write([]byte(m))
}

func handleErrors(w http.ResponseWriter, errors []error, code int) {
  m, _ := json.Marshal(map[string][]error{"errors": errors})

  w.WriteHeader(code)
  w.Write([]byte(m))
}