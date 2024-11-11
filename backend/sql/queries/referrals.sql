-- name: CreateReferral :one
INSERT INTO referrals (id, created_at, updated_at, name, surName, email, phone, avatar, fileName)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- name: DeleteReferral :exec
DELETE FROM referrals WHERE id = $1
RETURNING *;

-- name: SelectAllReferrals :many
SELECT sqlc.embed(referrals), sqlc.embed(address)
FROM referrals
JOIN address ON address.referrals_id = referrals.id
WHERE 1 = 1;

-- name: UpdateReferral :one
UPDATE referrals
SET
name = coalesce(sqlc.narg('name'), name),
surName = coalesce(sqlc.narg('surName'), surName),
email = coalesce(sqlc.narg('email'), email),
phone = coalesce(sqlc.narg('phone'), phone),
avatar = coalesce(sqlc.narg('avatar'), avatar),
fileName = coalesce(sqlc.narg('fileName'), fileName),
updated_at = $1
WHERE
id = $2
RETURNING *;

