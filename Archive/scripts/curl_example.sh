#!/bin/bash

# Base URL - change this to match your deployment
BASE_URL="http://localhost:8000"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Example 1: Basic query without streaming
echo -e "${GREEN}Example 1: Basic query${NC}"
echo "Question: What is the capital of France?"
echo 
echo -e "${BLUE}Request:${NC}"
echo "curl -X POST \"$BASE_URL/api/query\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"question\": \"What is the capital of France?\"}'"
echo
echo -e "${BLUE}Response:${NC}"
curl -s -X POST "$BASE_URL/api/query" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the capital of France?"}' | jq .
echo

# Example 2: Continue conversation with conversation_id
echo -e "\n${GREEN}Example 2: Continue conversation with conversation_id${NC}"
echo "First query to get a conversation_id, then follow-up question"
echo
echo -e "${BLUE}Execute this as two commands:${NC}"
echo "# Get conversation_id from first query"
echo "CONV_ID=\$(curl -s -X POST \"$BASE_URL/api/query\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"question\": \"What is the capital of France?\"}' | jq -r .conversation_id)"
echo
echo "# Use conversation_id for follow-up question"
echo "curl -X POST \"$BASE_URL/api/query\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"question\": \"What is its population?\", \"conversation_id\": \"\$CONV_ID\"}' | jq ."
echo

# Example 3: Streaming response example
echo -e "\n${GREEN}Example 3: Streaming response${NC}"
echo "Question: Explain the theory of relativity"
echo
echo -e "${BLUE}Request:${NC}"
echo "curl -N -X POST \"$BASE_URL/api/query\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"question\": \"Explain the theory of relativity\", \"stream\": true}'"
echo
echo -e "${BLUE}Response will be streamed as Server-Sent Events (SSE)${NC}"

# Example 4: With authentication (if enabled)
echo -e "\n${GREEN}Example 4: With authentication${NC}"
echo "If authentication is enabled in your application"
echo
echo -e "${BLUE}Request with auth parameters:${NC}"
echo "curl -X POST \"$BASE_URL/api/query\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"question\": \"What is the capital of France?\", "
echo "       \"client_principal_id\": \"your-client-id\", "
echo "       \"client_principal_name\": \"your-name\", "
echo "       \"access_token\": \"your-access-token\"}' | jq ."

echo
echo -e "${GREEN}Note: ${NC}Examples assume 'jq' is installed for JSON formatting. Install with 'sudo apt install jq' on Ubuntu or 'brew install jq' on macOS." 