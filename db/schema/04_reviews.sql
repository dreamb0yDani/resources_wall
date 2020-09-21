-- Drop and recreate REVIEWS table (Example)

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  comment TEXT,
  liked BOOLEAN NOT NULL DEFAULT FALSE,
  rating SMALLINT NOT NULL DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);