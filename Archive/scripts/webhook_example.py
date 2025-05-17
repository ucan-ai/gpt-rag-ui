#!/usr/bin/env python3
import requests
import json
import sseclient
import sys

# API base URL (change this to match your deployment)
BASE_URL = "http://localhost:8000"  # Update with your actual URL when deployed

def query_api(question, conversation_id=None, stream=False):
    """
    Send a query to the API webhook.
    
    Args:
        question (str): The question to ask
        conversation_id (str, optional): The conversation ID for continuing a conversation
        stream (bool): Whether to stream the response
        
    Returns:
        If stream=True: An SSE client iterator to process streaming chunks
        If stream=False: The complete response as a dict
    """
    url = f"{BASE_URL}/api/query"
    
    payload = {
        "question": question,
        "stream": stream
    }
    
    if conversation_id:
        payload["conversation_id"] = conversation_id
    
    # Optional authentication info if needed
    # payload["client_principal_id"] = "your-client-id"
    # payload["client_principal_name"] = "your-name"
    # payload["access_token"] = "your-access-token"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    if stream:
        response = requests.post(url, json=payload, headers=headers, stream=True)
        return sseclient.SSEClient(response)
    else:
        response = requests.post(url, json=payload, headers=headers)
        return response.json()

def demo_complete_response():
    """Demonstrate getting a complete response"""
    print("\n=== Complete Response Example ===")
    question = "Microsodt surface"
    print(f"Question: {question}")
    
    # First query (no conversation ID)
    response = query_api(question)
    print(f"Response: {response['response']}")
    print(f"Conversation ID: {response['conversation_id']}")
    
    # Follow-up question using the conversation ID
    follow_up = "What is its population?"
    print(f"\nFollow-up question: {follow_up}")
    follow_up_response = query_api(follow_up, conversation_id=response['conversation_id'])
    print(f"Response: {follow_up_response['response']}")

def demo_streaming_response():
    """Demonstrate handling a streaming response"""
    print("\n=== Streaming Response Example ===")
    question = "Explain quantum computing in simple terms"
    print(f"Question: {question}")
    print("Response: ", end="", flush=True)
    
    client = query_api(question, stream=True)
    for event in client.events():
        try:
            data = json.loads(event.data)
            chunk = data.get('chunk', '')
            print(chunk, end="", flush=True)
        except json.JSONDecodeError:
            print(f"Error decoding JSON: {event.data}")
    print()  # New line after streaming completes

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--stream":
        demo_streaming_response()
    else:
        demo_complete_response()
    
    print("\nTo use streaming mode: python webhook_example.py --stream") 