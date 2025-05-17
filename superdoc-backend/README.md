# SuperDoc Backend

This directory contains the Chainlit-based backend application with the standard Chainlit GUI.

## Key Files
- `app.py`: Main Chainlit application
- `main.py`: Core business logic
- `orchestrator_client.py`: Client for orchestration
- `auth.py`: Authentication logic

## Setup and Running

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
chainlit run app.py
```

The application will be available at http://localhost:8000 by default.

## Configuration
The backend uses the following configuration files:
- `.chainlit/config.yaml`: Chainlit-specific configuration
- `app_settings.json`: Application settings (in the root directory)

See the main README-STRUCTURE.md in the root directory for more details on the overall project structure. 