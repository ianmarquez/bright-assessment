package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/ianmarquez/bright-assessment/internal/database"
)

type Address struct {
	Name     string `json:"name"`
	Street   string `json:"street"`
	Suburb   string `json:"suburb"`
	State    string `json:"state"`
	Postcode string `json:"postcode"`
	Country  string `json:"country"`
}

type Referral struct {
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name      string    `json:"name"`
	Surname   string    `json:"surname"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Address   Address   `json:"address"`
	Avatar    string    `json:"avatar"`
	FileName  string    `json:"fileName"`
}

func DatabaseReferralToReferral(dbReferral database.Referral, dbAddress database.Address) Referral {
	address := Address{
		Name:     dbAddress.Name,
		Street:   dbAddress.Street,
		Suburb:   dbAddress.Suburb,
		State:    dbAddress.State,
		Postcode: dbAddress.Postcode,
		Country:  dbAddress.Country,
	}
	return Referral{
		ID:        dbReferral.ID,
		CreatedAt: dbReferral.CreatedAt,
		UpdatedAt: dbReferral.UpdatedAt,
		Name:      dbReferral.Name,
		Surname:   dbReferral.Surname,
		Email:     dbReferral.Email,
		Phone:     dbReferral.Phone,
		Address:   address,
		Avatar:    dbReferral.Avatar.String,
		FileName:  dbReferral.Filename.String,
	}
}

func DatabaseReferralsToReferrals(dbReferrals []database.SelectAllReferralsRow) []Referral {
	var newDbReferrals []Referral
	for _, dbReferral := range dbReferrals {
		newDbReferrals = append(
			newDbReferrals,
			DatabaseReferralToReferral(dbReferral.Referral, dbReferral.Address),
		)
	}
	return newDbReferrals
}
