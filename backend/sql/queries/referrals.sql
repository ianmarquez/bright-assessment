-- name: CreateReferral :one
INSERT INTO referrals (id, created_at, updated_at, name, surName, email, phone)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: DeleteReferral :one
DELETE FROM referrals WHERE id = $1
RETURNING *;

-- name: SelectAllReferrals :many
SELECT sqlc.embed(referrals), sqlc.embed(address)
FROM referrals
JOIN address ON address.referrals_id = referrals.id
WHERE 1 = 1;
