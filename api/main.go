package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"pos-backend/controllers"
	"pos-backend/routes"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CORS Middleware
func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	clientOptions := options.Client().ApplyURI("mongodb+srv://doru01:e9WWsRFrVoOJjaN7@cluster0.gre1j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("MongoDB bağlantısı başarılı")

	router := mux.NewRouter()

	// Controllers
	categoryController := controllers.NewCategoryController(client)
	productController := controllers.NewProductController(client)
	billController := controllers.NewBillController(client)
	userController := controllers.NewUserController(client)

	// Routes
	routes.CategoryRoutes(router, categoryController)
	routes.ProductRoutes(router, productController)
	routes.BillRoutes(router, billController)
	routes.UserRoutes(router, userController)

	corsRouter := enableCors(router)

	http.ListenAndServe(":8080", corsRouter)
}
