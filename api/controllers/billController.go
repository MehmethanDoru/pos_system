package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"pos-backend/models"
	"time"

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

// AddBill adds a new bill to the database
func (bc *BillController) AddBill(w http.ResponseWriter, r *http.Request) {
	var bill models.Bill
	_ = json.NewDecoder(r.Body).Decode(&bill)

	bill.ID = primitive.NewObjectID()
	bill.CreatedAt = primitive.NewDateTimeFromTime(time.Now().Add(3 * time.Hour)) // TR saati için +3 saat ekliyoruz
	bill.UpdatedAt = primitive.NewDateTimeFromTime(time.Now().Add(3 * time.Hour))

	_, err := billCollection.InsertOne(context.TODO(), bill)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(bill)
}

// GetBills retrieves all bills from the database
func (bc *BillController) GetBills(w http.ResponseWriter, r *http.Request) {
	var bills []models.Bill
	cursor, err := billCollection.Find(context.TODO(), primitive.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())
	if err = cursor.All(context.TODO(), &bills); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bills)
}
