# Running Instructions for Debugging Chainlit Custom Frontend

This guide provides step-by-step instructions to run and debug the custom frontend integration with Chainlit.

## Prerequisites

- Python 3.9+
- Node.js 18+
- npm or pnpm

## Step 1: Install Required Packages

```bash
pip install chainlit fastapi uvicorn
```

## Step 2: Run the Simplified Backend

The simplified backend uses test_app.py and app_wrapper.py to isolate potential issues:

```bash
python app_wrapper.py
```

You should see log messages indicating:
- "Mounting test Chainlit app at /chainlit"
- "Starting FastAPI server on port 8000"

## Step 3: Verify Backend Access

Open your browser and navigate to:
```
http://localhost:8000
```

You should see a JSON response: `{"message":"FastAPI wrapper for Chainlit is running. Access the app at /chainlit"}`

Also verify the authentication endpoint:
```
http://localhost:8000/custom-auth
```

This should redirect to the Chainlit app, showing the authentication is working.

## Step 4: Run the Custom Frontend

In a separate terminal:

```bash
cd custom-frontend
npm run dev
```

This will start the Vite development server on port 5173 or 5174.

## Step 5: Access the Frontend and Debug

Open your browser and navigate to the URL shown in the Vite output (typically http://localhost:5173).

You should see:
- Connection status information
- Debug information about the session
- The chat interface with the ElevenLabs widget

## Troubleshooting Common Issues

### CORS Issues
- Open browser developer tools (F12)
- Look for CORS errors in the Console tab
- Make sure app_wrapper.py has correct CORS settings
- Try using different browsers as they handle CORS differently

### Authentication Issues
- Check that the /custom-auth endpoint is working
- Make sure credentials are included in the fetch request
- Verify cookies are being set properly

### WebSocket Connection Issues
- Look for WebSocket errors in the browser console
- Check the WebSocket URL in the browser Network tab
- Make sure the Chainlit server is running
- Verify the path is correct (/chainlit/ws)

### Port Conflicts
- Make sure no other services are using port 8000
- If using port 8000 for other purposes, change both server and client code

## Debugging Tools

1. Browser Developer Tools:
   - Network tab to inspect HTTP and WebSocket requests
   - Console tab to see JavaScript errors and logs
   - Application tab to inspect cookies and storage

2. Terminal Logs:
   - Check the terminal running app_wrapper.py for server logs
   - Look for error messages or exceptions

3. Test with curl:
   - Test the authentication endpoint: `curl -v http://localhost:8000/custom-auth` 