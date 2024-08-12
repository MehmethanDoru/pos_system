package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"pos-backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection *mongo.Collection

type CategoryController struct {
	client *mongo.Client
}

func NewCategoryController(client *mongo.Client) *CategoryController {
	collection = client.Database("pos-app").Collection("categories")
	return &CategoryController{client: client}
}

// Get Categories
func (cc *CategoryController) GetCategories(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var categories []models.Category
	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())
	if err = cursor.All(context.TODO(), &categories); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(categories)
}

// Create Category
func (cc *CategoryController) CreateCategory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var category models.Category
	_ = json.NewDecoder(r.Body).Decode(&category)
	category.ID = primitive.NewObjectID()
	_, err := collection.InsertOne(context.TODO(), category)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(category)
}
