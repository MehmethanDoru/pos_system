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

// Get All Category
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

// Create a New Category
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

// Update Category
func (cc *CategoryController) UpdateCategory(w http.ResponseWriter, r *http.Request) {

	var category models.Category
	if err := json.NewDecoder(r.Body).Decode(&category); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if category.ID.IsZero() {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	ctx := context.TODO()
	update := bson.D{
		{"$set", bson.D{
			{"name", category.Name},
			{"slug", strings.ToLower(strings.ReplaceAll(category.Name, " ", "-"))},
		}},
	}
	result, err := categoryCollection.UpdateOne(
		ctx,
		bson.M{"_id": category.ID},
		update,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if result.ModifiedCount == 0 {
		http.Error(w, "No document found with that ID", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

// Delete Category
func (cc *CategoryController) DeleteCategory(w http.ResponseWriter, r *http.Request) {
	var category models.Category
	if err := json.NewDecoder(r.Body).Decode(&category); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if category.ID.IsZero() {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	ctx := context.TODO()
	result, err := categoryCollection.DeleteOne(ctx, bson.M{"_id": category.ID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if result.DeletedCount == 0 {
		http.Error(w, "No document found with that ID", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success", "message": "Category deleted successfully"})
}
