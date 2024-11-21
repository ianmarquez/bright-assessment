package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/ianmarquez/bright-assessment/handlers"
	"github.com/ianmarquez/bright-assessment/internal/database"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("godotenv failed to load environment params with err:", err)
	}

	portString := os.Getenv("PORT")
	if portString == "" {
		log.Fatal("PORT env variable not set")
	}

	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL variable not set")
	}

	conn, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Can't connect to database")
	}

	apiCfg := handlers.ApiConfig{
		DB: database.New(conn),
	}

	router := chi.NewRouter()
	router.Use(middleware.Logger)

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	v1Router := chi.NewRouter()
	v1Router.Get("/healthz", handlers.HandlerReadiness)
	v1Router.Get("/error", handlers.HandlerError)

	referralsRouter := chi.NewRouter()
	referralsRouter.Post("/", apiCfg.HandlerCreateReferral)
	referralsRouter.Delete("/", apiCfg.HandlerDeleteReferral)
	referralsRouter.Get("/", apiCfg.HandlerFetchAllReferral)
	referralsRouter.Put("/{id}", apiCfg.HandlerUpdateReferral)

	v1Router.Mount("/referrals", referralsRouter)
	router.Mount("/v1", v1Router)

	srv := &http.Server{
		Handler: router,
		Addr:    ":" + portString,
	}

	fmt.Println(`
 ______     ______        ______     ______   __    
/\  ___\   /\  __ \      /\  __ \   /\  == \ /\ \   
\ \ \__ \  \ \ \/\ \     \ \  __ \  \ \  _-/ \ \ \  
 \ \_____\  \ \_____\     \ \_\ \_\  \ \_\    \ \_\ 
  \/_____/   \/_____/      \/_/\/_/   \/_/     \/_/ `)

	fmt.Println("running on port: ", portString)

	err = srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}

}
