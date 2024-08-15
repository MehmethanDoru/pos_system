package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"pos-backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var productCollection *mongo.Collection

type ProductController struct {
	client *mongo.Client
}

func NewProductController(client *mongo.Client) *ProductController {
	productCollection = client.Database("pos-app").Collection("products")
	return &ProductController{client: client}
}

// Get all products
func (pc *ProductController) GetProducts(w http.ResponseWriter, r *http.Request) {
	var products []models.Product
	cursor, err := productCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())
	if err = cursor.All(context.TODO(), &products); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

// Create a new product
func (pc *ProductController) CreateProduct(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	_ = json.NewDecoder(r.Body).Decode(&product)
	product.ID = primitive.NewObjectID()

	_, err := productCollection.InsertOne(context.TODO(), product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}

// Update a product
func (pc *ProductController) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	_ = json.NewDecoder(r.Body).Decode(&product)

	log.Printf("Updating product: %+v", product)

	objectID, err := primitive.ObjectIDFromHex(product.ID.Hex())
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	update := bson.M{
		"$set": bson.M{
			"title":    product.Title,
			"img":      product.Img,
			"price":    product.Price,
			"category": product.Category,
		},
	}

	result, err := productCollection.UpdateOne(context.TODO(), bson.M{"_id": objectID}, update)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	log.Printf("Update result: %+v", result)

	w.WriteHeader(http.StatusOK)
}

// Delete a product
func (pc *ProductController) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	_ = json.NewDecoder(r.Body).Decode(&product)
	objectID, err := primitive.ObjectIDFromHex(product.ID.Hex())
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = productCollection.DeleteOne(context.TODO(), bson.M{"_id": objectID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
