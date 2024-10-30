package handlers

import (
	"net/http"

	"github.com/ianmarquez/bright-assessment/helpers"
)

func HandlerReadiness(w http.ResponseWriter, r *http.Request) {
	helpers.RespondWithJSON(w, http.StatusOK, struct{}{})
}
