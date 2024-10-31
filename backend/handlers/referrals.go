package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/ianmarquez/bright-assessment/helpers"
	"github.com/ianmarquez/bright-assessment/internal/database"
	"github.com/ianmarquez/bright-assessment/models"
)

func (api *ApiConfig) HandlerDeleteReferral(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	id, err := uuid.Parse(query.Get("id"))
	fmt.Print(query.Get("id"))
	if err != nil {
		helpers.RespondWithError(
			w,
			http.StatusBadRequest,
			fmt.Sprintf("ID is not a valid UUID: %s", err),
		)
		return
	}

	_, err = api.DB.DeleteReferral(r.Context(), id)

	if err != nil {
		helpers.RespondWithError(
			w,
			http.StatusInternalServerError,
			fmt.Sprintf("An error has occurred when deleting referral: %s", err),
		)
		return
	}
	helpers.RespondWithJSON(
		w,
		http.StatusAccepted,
		struct {
			Message string
			ID      uuid.UUID
		}{
			Message: "Successfully deleted",
			ID:      id,
		},
	)

}

func (api *ApiConfig) HandlerFetchAllReferral(w http.ResponseWriter, r *http.Request) {
	referrals, err := api.DB.SelectAllReferrals(r.Context())
	if err != nil {
		helpers.RespondWithError(
			w,
			http.StatusBadRequest,
			fmt.Sprintf("Error fetching referrals: %s", err),
		)
		return
	}
	helpers.RespondWithJSON(
		w,
		http.StatusOK,
		models.DatabaseReferralsToReferrals(referrals),
	)
}

func (api *ApiConfig) HandlerCreateReferral(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name    string `json:"name,omitempty"`
		SurName string `json:"sur_name,omitempty"`
		Email   string `json:"email,omitempty"`
		Phone   string `json:"phone,omitempty"`
		Address struct {
			Name     string `json:"name,omitempty"`
			Street   string `json:"street,omitempty"`
			Suburb   string `json:"suburb,omitempty"`
			State    string `json:"state,omitempty"`
			Postcode string `json:"post_code,omitempty"`
			Country  string `json:"country,omitempty"`
		} `json:"address,omitempty"`
	}

	decoder := json.NewDecoder(r.Body)
	params := parameters{}

	err := decoder.Decode(&params)
	if err != nil {
		helpers.RespondWithError(
			w,
			http.StatusBadRequest,
			fmt.Sprintf("Error parsing JSON: %s", err),
		)
		return
	}

	referral, err := api.DB.CreateReferral(r.Context(), database.CreateReferralParams{
		ID:        uuid.New(),
		Name:      params.Name,
		Email:     params.Email,
		Surname:   params.SurName,
		Phone:     params.Phone,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	})

	if err != nil {
		helpers.RespondWithError(
			w,
			http.StatusInternalServerError,
			fmt.Sprintf("Error adding referral: %s", err),
		)
		return
	}

	address, err := api.DB.CreateAddress(r.Context(), database.CreateAddressParams{
		Name:        params.Address.Name,
		Street:      params.Address.Street,
		Suburb:      params.Address.Suburb,
		State:       params.Address.State,
		Postcode:    params.Address.Postcode,
		Country:     params.Address.Country,
		CreatedAt:   time.Now().UTC(),
		UpdatedAt:   time.Now().UTC(),
		ReferralsID: referral.ID,
	})

	if err != nil {
		helpers.RespondWithError(
			w,
			http.StatusInternalServerError,
			fmt.Sprintf("Error adding referral adddress: %s", err),
		)
		return
	}

	helpers.RespondWithJSON(
		w,
		http.StatusCreated,
		models.DatabaseReferralToReferral(referral, address),
	)
}