# Debugging Guide for Chainlit Custom Frontend

## Quick Start

1. **Start Backend:**
   ```bash
   python app_wrapper.py
   ```

2. **Start Frontend:**
   ```bash
   cd custom-frontend
   npm run dev
   ```

3. **Access the Frontend:**
   Open http://localhost:5173 in your browser

## Step-by-Step Frontend Testing

1. **Test Backend Root URL:**
   - Navigate to http://localhost:8000
   - Should see a JSON message: `{"message":"FastAPI wrapper for Chainlit is running..."}`

2. **Test Chainlit App:**
   - Navigate to http://localhost:8000/chainlit
   - Should see the standard Chainlit interface

3. **Check WebSocket Connection:**
   - Open browser developer tools (F12)
   - Go to Network tab and filter by "WS"
   - Refresh the frontend page
   - Look for a WebSocket connection to ws://localhost:8000/chainlit/ws
   - Verify connection status: Should be "Connected"

4. **Check for CORS Errors:**
   - In browser console, look for any CORS-related errors
   - If present, verify the CORS configuration in app_wrapper.py

## Verifying Authentication Flow

1. **Directly test /custom-auth endpoint:**
   ```bash
   curl -v http://localhost:8000/custom-auth
   ```
   - Look for Set-Cookie headers in the response
   - Verify you get a 200 status code

2. **Check authentication in browser:**
   - Open browser developer tools
   - Go to Application > Cookies
   - Verify auth cookies are set after visiting the frontend

## Logs to Check

1. **Backend Logs:**
   - Watch the terminal running app_wrapper.py
   - Look for socket connection and message events
   - Check for any errors or warnings

2. **Frontend Console:**
   - Check browser console for connection status
   - Look for any errors related to WebSocket or API calls

## Final Checks

If everything is correctly set up, you should be able to:

1. Send a message in the frontend
2. See the message appear in the backend logs
3. Receive a response from the backend
4. See the response appear in the frontend UI

If any step fails, the logs will help pinpoint the exact issue. 