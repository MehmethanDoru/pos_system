package routes

import (
	"pos-backend/controllers"

	"github.com/gorilla/mux"
)

func UserRoutes(router *mux.Router, uc *controllers.UserController) {
	router.HandleFunc("/api/register", uc.RegisterUser).Methods("POST")
	router.HandleFunc("/api/login", uc.LoginUser).Methods("POST")
	router.HandleFunc("/api/users", uc.GetUsers).Methods("GET")
}
