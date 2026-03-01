-- File: cleanup_test_users.sql
-- Purpose: Remove test users from the poetry database
-- These users were created by integration tests without cleanup

-- Delete test users by username pattern and email pattern
DELETE FROM "user" WHERE username IN (
  'jwtuser1',
  'jwtuser2',
  'duplicateuser',
  'refreshuser',
  'validuser',
  'loginuser',
  'registeruser',
  'invaliduser',
  'audituser'
);

-- Also delete any users with @test.com email (test data)
DELETE FROM "user" WHERE email LIKE '%@test.com';

-- Verify cleanup
SELECT COUNT(*) as remaining_test_users
FROM "user"
WHERE email LIKE '%@test.com'
  OR username IN ('jwtuser1', 'jwtuser2', 'duplicateuser', 'refreshuser',
                  'validuser', 'loginuser', 'registeruser', 'invaliduser', 'audituser');
