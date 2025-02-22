package routes

import (
	"pos-backend/controllers"

	"github.com/gorilla/mux"
)

func ProductRoutes(router *mux.Router, pc *controllers.ProductController) {
	router.HandleFunc("/api/products", pc.GetProducts).Methods("GET")
	router.HandleFunc("/api/products", pc.CreateProduct).Methods("POST")
	router.HandleFunc("/api/products", pc.UpdateProduct).Methods("PUT")
	router.HandleFunc("/api/products", pc.DeleteProduct).Methods("DELETE")

}
