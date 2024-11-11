-- +goose Up

ALTER TABLE referrals
ADD COLUMN avatar TEXT,
ADD COLUMN fileName TEXT
;

-- +goose Down
ALTER TABLE referrals
DROP COLUMN avatar,
DROP COLUMN fileName
;
