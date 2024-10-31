// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: referrals.sql

package database

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createReferral = `-- name: CreateReferral :one
INSERT INTO referrals (id, created_at, updated_at, name, surName, email, phone)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id, created_at, updated_at, name, surname, email, phone
`

type CreateReferralParams struct {
	ID        uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
	Name      string
	Surname   string
	Email     string
	Phone     string
}

func (q *Queries) CreateReferral(ctx context.Context, arg CreateReferralParams) (Referral, error) {
	row := q.db.QueryRowContext(ctx, createReferral,
		arg.ID,
		arg.CreatedAt,
		arg.UpdatedAt,
		arg.Name,
		arg.Surname,
		arg.Email,
		arg.Phone,
	)
	var i Referral
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Surname,
		&i.Email,
		&i.Phone,
	)
	return i, err
}

const deleteReferral = `-- name: DeleteReferral :exec
DELETE FROM referrals WHERE id = $1
RETURNING id, created_at, updated_at, name, surname, email, phone
`

func (q *Queries) DeleteReferral(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.ExecContext(ctx, deleteReferral, id)
	return err
}

const selectAllReferrals = `-- name: SelectAllReferrals :many
SELECT referrals.id, referrals.created_at, referrals.updated_at, referrals.name, referrals.surname, referrals.email, referrals.phone, address.id, address.created_at, address.updated_at, address.name, address.street, address.suburb, address.state, address.postcode, address.country, address.referrals_id
FROM referrals
JOIN address ON address.referrals_id = referrals.id
WHERE 1 = 1
`

type SelectAllReferralsRow struct {
	Referral Referral
	Address  Address
}

func (q *Queries) SelectAllReferrals(ctx context.Context) ([]SelectAllReferralsRow, error) {
	rows, err := q.db.QueryContext(ctx, selectAllReferrals)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []SelectAllReferralsRow
	for rows.Next() {
		var i SelectAllReferralsRow
		if err := rows.Scan(
			&i.Referral.ID,
			&i.Referral.CreatedAt,
			&i.Referral.UpdatedAt,
			&i.Referral.Name,
			&i.Referral.Surname,
			&i.Referral.Email,
			&i.Referral.Phone,
			&i.Address.ID,
			&i.Address.CreatedAt,
			&i.Address.UpdatedAt,
			&i.Address.Name,
			&i.Address.Street,
			&i.Address.Suburb,
			&i.Address.State,
			&i.Address.Postcode,
			&i.Address.Country,
			&i.Address.ReferralsID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateReferral = `-- name: UpdateReferral :one
UPDATE referrals
SET
name = coalesce($3, name),
surName = coalesce($4, surName),
email = coalesce($5, email),
phone = coalesce($6, phone),
updated_at = $1
WHERE
id = $2
RETURNING id, created_at, updated_at, name, surname, email, phone
`

type UpdateReferralParams struct {
	UpdatedAt time.Time
	ID        uuid.UUID
	Name      sql.NullString
	SurName   sql.NullString
	Email     sql.NullString
	Phone     sql.NullString
}

func (q *Queries) UpdateReferral(ctx context.Context, arg UpdateReferralParams) (Referral, error) {
	row := q.db.QueryRowContext(ctx, updateReferral,
		arg.UpdatedAt,
		arg.ID,
		arg.Name,
		arg.SurName,
		arg.Email,
		arg.Phone,
	)
	var i Referral
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Name,
		&i.Surname,
		&i.Email,
		&i.Phone,
	)
	return i, err
}
