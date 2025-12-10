@echo off
echo.
echo ========================================
echo  TESTING AUTO-COMMIT (Quick Version)
echo ========================================
echo.
echo This is a test mode that checks every 1 minute
echo Use this to make sure everything works
echo.
echo Normal mode checks every 30 minutes
echo.
echo Try this:
echo 1. Make a small change to any file
echo 2. Save it
echo 3. Wait 1 minute
echo 4. You should see it commit automatically
echo.
echo Press any key to start test...
pause > nul

node test-quick.js
