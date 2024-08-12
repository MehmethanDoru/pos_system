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

var billCollection *mongo.Collection

type BillController struct {
	client *mongo.Client
}

func NewBillController(client *mongo.Client) *BillController {
	billCollection = client.Database("pos-app").Collection("bills")
	return &BillController{client: client}
}

// Get Bills
func (bc *BillController) GetBills(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var bills []models.Bill
	cursor, err := billCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())
	if err = cursor.All(context.TODO(), &bills); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(bills)
}

// Create Bill
func (bc *BillController) CreateBill(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var bill models.Bill
	_ = json.NewDecoder(r.Body).Decode(&bill)
	bill.ID = primitive.NewObjectID()
	_, err := billCollection.InsertOne(context.TODO(), bill)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(bill)
}
