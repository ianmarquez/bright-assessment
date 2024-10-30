package handlers

import (
	"net/http"

	"github.com/ianmarquez/bright-assessment/helpers"
)

func HandlerError(w http.ResponseWriter, r *http.Request) {
	helpers.RespondWithError(w, 400, "Something went wrong!")
}
