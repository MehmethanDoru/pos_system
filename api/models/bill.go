package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Bill model
type Bill struct {
	ID                  primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	CustomerName        string             `bson:"customerName" json:"customerName"`
	CustomerPhoneNumber string             `bson:"customerPhoneNumber" json:"customerPhoneNumber"`
	PaymentMode         string             `bson:"paymentMode" json:"paymentMode"`
	CartItems           []CartItem         `bson:"cartItems" json:"cartItems"`
	SubTotal            float64            `bson:"subTotal" json:"subTotal"`
	Tax                 float64            `bson:"tax" json:"tax"`
	TotalAmount         float64            `bson:"totalAmount" json:"totalAmount"`
	CreatedAt           primitive.DateTime `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
	UpdatedAt           primitive.DateTime `bson:"updatedAt,omitempty" json:"updatedAt,omitempty"`
}

// CartItem model
type CartItem struct {
	ProductID primitive.ObjectID `bson:"productId" json:"productId"`
	Title     string             `bson:"title" json:"title"`
	Price     float64            `bson:"price" json:"price"`
	Quantity  int                `bson:"quantity" json:"quantity"`
}
