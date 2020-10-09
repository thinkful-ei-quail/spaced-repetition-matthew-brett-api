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
    --- password = "Passw0rd!"
    '$2a$12$zXRWcO4lQ0UTPtk/UPidZ.mWtl/I/DK1/jmrE8tjncwsjq3l0nQr6'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'French', 1);
  
INSERT INTO "word" ("id", "language_id", "original", "translation", "next", "memory_value", "correct_count", "incorrect_count" )
VALUES
  (1, 1, 'equilibre', 'balance', 2, 1, 0 ,0),
  (2, 1, 'automatique', 'automate', 3, 1, 0 ,0),
  (3, 1, 'extrapole', 'extrapolate', 4, 1, 0 ,0),
  (4, 1, 'maintenir', 'maintain', 5, 1, 0 ,0),
  (5, 1, 'resoudre', 'solve', 6, 1, 0 ,0),
  (6, 1, 'programme', 'program', 7, 1, 0 ,0),
  (7, 1, 'qualite', 'quality', 8, 1, 0 ,0),
  (8, 1, 'prioriser', 'prioritize', 9, 1, 0 ,0),
  (9, 1, 'livrer', 'deliver', 10, 1, 0, 0),
  (10, 1, 'processus', 'process', null, 1, 0, 0);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
