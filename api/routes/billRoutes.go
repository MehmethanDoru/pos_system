package routes

import (
	"pos-backend/controllers"

	"github.com/gorilla/mux"
)

func BillRoutes(router *mux.Router, bc *controllers.BillController) {
	router.HandleFunc("/api/bills", bc.GetBills).Methods("GET")
	router.HandleFunc("/api/bills", bc.CreateBill).Methods("POST")
}
