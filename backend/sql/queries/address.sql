-- name: CreateAddress :one
INSERT INTO address (created_at, updated_at, name, street, suburb, state, postCode, country, referrals_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- name: UpdateAddress :one
UPDATE address
SET
name = coalesce(sqlc.narg('name'), name),
street = coalesce(sqlc.narg('street'), street),
suburb = coalesce(sqlc.narg('suburb'), suburb),
state = coalesce(sqlc.narg('state'), state),
postCode = coalesce(sqlc.narg('postCode'), postCode),
country = coalesce(sqlc.narg('country'), country),
updated_at = $1
WHERE referrals_id = $2
RETURNING *;
