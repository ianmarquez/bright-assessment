package helpers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	dat, err := json.Marshal(payload)
	if err != nil {
		fmt.Printf("Failed to marshal JSON response: %v", payload)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)

	_, err = w.Write(dat)
	if err != nil {
		log.Printf("Failed to write JSON response: %v", payload)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func RespondWithError(w http.ResponseWriter, code int, msg string) {
	if code > 499 {
		fmt.Println("Responding with 5XX error:", msg)
	}

	type errResponse struct {
		Error string `json:"error,omitempty"`
	}

	RespondWithJSON(w, code, errResponse{
		Error: msg,
	})
}
