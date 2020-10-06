BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'TestAccount',
    'Tesy Testofferson',
    -- password = "Passw0rd!"
    '$2a$12$zXRWcO4lQ0UTPtk/UPidZ.mWtl/I/DK1/jmrE8tjncwsjq3l0nQr6'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'French', 1);
  
INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'équilibre', 'balance', 2),
  (2, 1, 'automatique', 'Automate', 3),
  (3, 1, 'extrapolé', 'extrapolate', 4),
  (4, 1, 'maintenir', 'maintain', 5),
  (5, 1, 'résoudre', 'solve', 6),
  (6, 1, 'programme', 'program', 7),
  (7, 1, 'qualité', 'quality', 8),
  (7, 1, 'prioriser', 'prioritize', 9),
  (7, 1, 'livrer', 'deliver', 10),
  (8, 1, 'processus', 'process', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
