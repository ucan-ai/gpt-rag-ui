# API Webhook for GPT-RAG UI

This document describes how to use the webhook API for interacting with the GPT-RAG UI application programmatically.

## API Documentation

The API is documented using Swagger UI, which provides an interactive interface to explore and test the API. You can access the Swagger UI at:

```
http://your-app-url/api/docs
```

This interface allows you to:
- See all available endpoints
- View request and response schemas
- Test API calls directly from your browser

## API Endpoint

The webhook is available at the following endpoint:

```
POST /api/query
```

## Request Format

The request body should be a JSON object with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| question | string | Yes | The query or question to ask |
| conversation_id | string | No | Optional conversation ID for continuing a conversation |
| stream | boolean | No | Whether to stream the response (default: false) |
| client_principal_id | string | No | Client ID for authentication (if enabled) |
| client_principal_name | string | No | Client name for authentication (if enabled) |
| client_group_names | array | No | List of group names for authentication (if enabled) |
| access_token | string | No | Access token for authentication (if enabled) |

### Example Request

```json
{
  "question": "What is the capital of France?",
  "stream": false
}
```

## Response Format

### Non-Streaming Response

When `stream` is set to `false` (or omitted), the API will return a JSON object with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| response | string | The complete response text |
| conversation_id | string | The conversation ID (can be used for follow-up questions) |

Example:

```json
{
  "response": "The capital of France is Paris.",
  "conversation_id": "12345678-1234-1234-1234-123456789012"
}
```

### Streaming Response

When `stream` is set to `true`, the API will return a stream of Server-Sent Events (SSE). Each event will contain a JSON object with a `chunk` field containing a portion of the response.

Example event:

```
data: {"chunk": "The capital of"}
```

```
data: {"chunk": " France is Paris."}
```

## Example Usage

### Python Client (Non-Streaming)

```python
import requests

url = "https://your-app-url.com/api/query"
payload = {
    "question": "What is the capital of France?",
    "stream": False
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(f"Response: {data['response']}")
print(f"Conversation ID: {data['conversation_id']}")
```

### Python Client (Streaming)

```python
import requests
import sseclient
import json

url = "https://your-app-url.com/api/query"
payload = {
    "question": "What is the capital of France?",
    "stream": True
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers, stream=True)
client = sseclient.SSEClient(response)

for event in client.events():
    try:
        data = json.loads(event.data)
        chunk = data.get('chunk', '')
        print(chunk, end="", flush=True)
    except json.JSONDecodeError:
        print(f"Error decoding JSON: {event.data}")
```

## Authentication

If authentication is enabled in your application, you'll need to provide authentication information in your requests. The exact requirements may vary depending on your authentication configuration.

## Error Handling

The API will return appropriate HTTP status codes for different error scenarios:

- 400 Bad Request: Missing required fields or invalid request format
- 401 Unauthorized: Authentication failed (if authentication is enabled)
- 500 Internal Server Error: Server-side error processing the request

Error responses will be returned as JSON objects with an `error` field containing the error message.

Example:

```json
{
  "error": "Missing required field 'question'"
}
```

## Dependencies

To use the streaming functionality in Python, you'll need to install the `sseclient` package:

```
pip install sseclient-py
```

## Example Script

A complete example script is available in the `scripts` directory as `webhook_example.py`. 