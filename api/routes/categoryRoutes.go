package routes

import (
	"pos-backend/controllers"

	"github.com/gorilla/mux"
)

func CategoryRoutes(router *mux.Router, cc *controllers.CategoryController) {
	router.HandleFunc("/api/categories", cc.GetCategories).Methods("GET")
	router.HandleFunc("/api/categories", cc.CreateCategory).Methods("POST")
}
