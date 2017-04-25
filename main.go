package main

import (
  "net/http"
  "flag"
  "log"

  "github.com/thgleb/shri2/models"
  "github.com/thgleb/shri2/handlers"
  "github.com/julienschmidt/httprouter"
)

func main() {
  log.Println("Establishing database connection...")

  err := models.OpenDbConn()
  if err != nil {
    log.Fatal(err)
  }
  defer models.CloseDbConn()

  // Create database
  createDbFlag := flag.Bool("scheme", false, "Create a db file")
  flag.Parse()

  if (*createDbFlag) {
    err = models.CreateScheme()
    if err != nil {
      log.Fatal(err)
    } else {
      log.Println("Successfully created scheme for database.")
    }

    return
  }

  // Routes
  r := httprouter.New()

  r.GET("/api/schools", handlers.GetSchools)
  r.POST("/api/schools", handlers.SaveSchools)
  r.DELETE("/api/schools/:id", handlers.DeleteSchool)

  r.NotFound = http.FileServer(http.Dir("public"))

  log.Println("Serving at http://localhost:8081/")
  log.Fatal(http.ListenAndServe(":8081", r))
}