# SuperDoc

A RAG-powered document question answering application with dual interface options:
1. Standard Chainlit GUI (superdoc-backend)
2. Custom React Frontend (superdoc-frontend)

## Project Structure

This project has been reorganized into a cleaner structure:

```
.
├── superdoc-backend/       # Chainlit backend with standard GUI
├── superdoc-frontend/      # Custom React frontend
├── app_settings.json       # Application settings
├── README-STRUCTURE.md     # Detailed structure documentation
├── run-superdoc.ps1        # Script to run both components
└── test_setup.py           # Script to verify setup
```

See [README-STRUCTURE.md](README-STRUCTURE.md) for detailed information about the project structure and running instructions.

## Quick Start

1. Check your setup:
```bash
python test_setup.py
```

2. Run both components:
```bash
.\run-superdoc.ps1
```

The backend will be available at http://localhost:8000 and the frontend at http://localhost:5173.

## Configuration

Edit the `app_settings.json` file to configure the application settings. 