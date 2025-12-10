@echo off
:loop
cls
echo.
echo ========================================
echo  MOTIVATION MESSAGES
echo ========================================
echo.
node inspiration-boost.js message
echo.
echo ========================================
echo.
echo Press any key for another message
echo or close this window to stop
echo.
pause > nul
goto loop
