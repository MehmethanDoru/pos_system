package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Product model
type Product struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title    string             `bson:"title" json:"title"`
	Img      string             `bson:"img" json:"img"`
	Price    float64            `bson:"price" json:"price"`
	Category string             `bson:"category" json:"category"`
}

type ProductWithTimestamp struct {
	Product   `bson:",inline"`
	CreatedAt primitive.DateTime `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
	UpdatedAt primitive.DateTime `bson:"updatedAt,omitempty" json:"updatedAt,omitempty"`
}
