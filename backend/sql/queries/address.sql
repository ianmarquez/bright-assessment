-- name: CreateAddress :one
INSERT INTO address (created_at, updated_at, name, street, suburb, state, postCode, country, referrals_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;





