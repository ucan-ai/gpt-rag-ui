# Chainlit Configuration Guide

This document outlines the important configuration details for getting the custom frontend to work with Chainlit.

## Key @chainlit/react-client Version

The frontend uses @chainlit/react-client version 0.2.2, which is important for compatibility.

```json
{
  "dependencies": {
    "@chainlit/react-client": "0.2.2"
  }
}
```

## Backend Setup

The backend uses a FastAPI wrapper to provide:
- CORS headers for frontend communication
- Authentication endpoint via /custom-auth
- Mounting of the Chainlit app at /chainlit

## Connection Flow

1. Frontend connects directly to the backend using WebSockets
2. Authentication can be handled via the /custom-auth endpoint
3. Messages are sent/received through the WebSocket connection

## Debugging Tips

1. Check browser console for WebSocket connection errors
2. Verify CORS configuration allows your frontend origin
3. Look at server logs for authentication and WebSocket issues
4. Ensure both servers (frontend and backend) are running 

## Common Issues

- If Chainlit version changes, the @chainlit/react-client version may need to match
- CORS headers must be correctly configured for your dev environment
- Authentication cookies must be properly set during the auth flow
- WebSocket connections typically require working cross-origin settings 