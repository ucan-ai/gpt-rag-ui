# SuperDoc Project Structure

This project is organized into two main components:

## 1. superdoc-backend
Contains the Chainlit-based backend for the application with the standard Chainlit GUI.

Key files:
- `app.py`: Main Chainlit application
- `main.py`: Core business logic
- `orchestrator_client.py`: Client for orchestration
- `auth.py`: Authentication logic

## 2. superdoc-frontend
Contains the custom frontend UI built with React/Vite.

Key files:
- `package.json`: Frontend dependencies
- `vite.config.ts`: Vite configuration
- `src/`: Frontend source code

## Configuration Files (Root directory)
- `app_settings.json`: Application settings
- `requirements.txt`: Python dependencies
- `load_settings.py`: Helper script to load settings from app_settings.json
- `run-superdoc.ps1`: PowerShell script to run both backend and frontend
- `README.md`: Main project README
- `README-STRUCTURE.md`: This file explaining the project structure
- `chainlit.config.yaml`: Chainlit configuration
- `azure.yaml`: Azure configuration

## Running the Application

### Using the run script (Windows)
```powershell
# Run both backend and frontend
.\run-superdoc.ps1

# Run only backend
.\run-superdoc.ps1 backend

# Run only frontend
.\run-superdoc.ps1 frontend
```

### Backend
```bash
cd superdoc-backend
# Install dependencies
pip install -r requirements.txt
# Run the application
chainlit run app.py
```

### Frontend
```bash
cd superdoc-frontend
# Install dependencies
npm install
# Run the development server
npm run dev
```

## Testing the Setup
You can run the test_setup.py script to verify if your environment is correctly set up:

```bash
python test_setup.py
```

## Archive
The `Archive` directory contains original files and directories that were part of the previous project structure and are kept for reference. 