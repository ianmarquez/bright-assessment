package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/ianmarquez/bright-assessment/internal/database"
)

type Address struct {
	Name     string `json:"name,omitempty"`
	Street   string `json:"street,omitempty"`
	Suburb   string `json:"suburb,omitempty"`
	State    string `json:"state,omitempty"`
	Postcode string `json:"postcode,omitempty"`
	Country  string `json:"country,omitempty"`
}

type Referral struct {
	ID        uuid.UUID `json:"id,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	Name      string    `json:"name,omitempty"`
	Surname   string    `json:"surname,omitempty"`
	Email     string    `json:"email,omitempty"`
	Phone     string    `json:"phone,omitempty"`
	Address   Address   `json:"address,omitempty"`
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
