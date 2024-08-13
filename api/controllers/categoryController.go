package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"pos-backend/models"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var categoryCollection *mongo.Collection

type CategoryController struct {
	client *mongo.Client
}

func NewCategoryController(client *mongo.Client) *CategoryController {
	categoryCollection = client.Database("pos-app").Collection("categories")
	return &CategoryController{client: client}
}

// Get all categories
func (cc *CategoryController) GetCategories(w http.ResponseWriter, r *http.Request) {
	var categories []models.Category
	cursor, err := categoryCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())
	if err = cursor.All(context.TODO(), &categories); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
}

// Create a new category
func (cc *CategoryController) CreateCategory(w http.ResponseWriter, r *http.Request) {
	var category models.Category
	_ = json.NewDecoder(r.Body).Decode(&category)
	category.ID = primitive.NewObjectID()
	category.Slug = strings.ToLower(strings.ReplaceAll(category.Name, " ", "-"))
	_, err := categoryCollection.InsertOne(context.TODO(), category)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(category)
}
