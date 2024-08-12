package main

import (
	"context"
	"pos-backend/controllers"
	"pos-backend/routes"

	"github.com/gorilla/mux"

	//"encoding/json"
	"fmt"
	"log"
	"net/http"

	//"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

// CORS Middleware
func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Eğer istek bir OPTIONS isteğiyse (preflight request), hemen 200 OK döndür
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Asıl isteği işleme
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

	categoryController := controllers.NewCategoryController(client)
	router := mux.NewRouter()
	routes.CategoryRoutes(router, categoryController)

	http.ListenAndServe(":8080", router)

	// CORS middleware'i kullanarak route'ları sar
	/*mux := http.NewServeMux()
	mux.HandleFunc("/api/users", getUsers)

	http.ListenAndServe(":8080", enableCors(mux))*/
}

/*func getUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	collection := client.Database("test").Collection("users")

	// Veritabanından tüm kullanıcıları getir
	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())

	var users []bson.M
	if err = cursor.All(context.TODO(), &users); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}*/
