package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title    string             `bson:"title" json:"title"`
	Img      string             `bson:"img" json:"img"`
	Price    float64            `bson:"price" json:"price"`
	Category string             `bson:"category" json:"category"`
}
