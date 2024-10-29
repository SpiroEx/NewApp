@echo off

if "%1" == "" (
    npm run dev
    goto :EOF
)

call utils\venv\Scripts\activate
python utils\init.py %*