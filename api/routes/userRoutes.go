package routes

import (
	"pos-backend/controllers"

	"github.com/gorilla/mux"
)

func UserRoutes(router *mux.Router, uc *controllers.UserController) {
	router.HandleFunc("/api/users", uc.GetUsers).Methods("GET")
	router.HandleFunc("/api/users", uc.CreateUser).Methods("POST")
}
