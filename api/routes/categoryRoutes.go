package routes

import (
	"pos-backend/controllers"

	"github.com/gorilla/mux"
)

func CategoryRoutes(router *mux.Router, cc *controllers.CategoryController) {
	router.HandleFunc("/api/categories", cc.GetCategories).Methods("GET")
	router.HandleFunc("/api/categories", cc.CreateCategory).Methods("POST")
	router.HandleFunc("/api/categories", cc.UpdateCategory).Methods("PUT")
	router.HandleFunc("/api/categories", cc.DeleteCategory).Methods("DELETE")
}
