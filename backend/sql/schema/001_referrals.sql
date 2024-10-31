-- +goose Up
CREATE TABLE referrals (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  surName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  street TEXT NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  postCode TEXT NOT NULL,
  country TEXT NOT NULL,
  referrals_id UUID NOT NULL REFERENCES referrals (id) on DELETE CASCADE
);

-- +goose Down
DROP TABLE IF EXISTS referrals;
DROP TABLE IF EXISTS address;
