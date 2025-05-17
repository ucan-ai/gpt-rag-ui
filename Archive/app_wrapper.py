from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware
import logging
import os

from chainlit.user import User
from chainlit.utils import mount_chainlit
from chainlit.server import _authenticate_user

# Configure logging with more detail
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Make sure we have permissions to create and modify files in the current directory
logger.info(f"Current working directory: {os.getcwd()}")

app = FastAPI()

# Add CORS middleware with explicit origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
async def root():
    logger.info("Root endpoint called")
    return {"message": "FastAPI wrapper for Chainlit is running. Access the app at /chainlit"}

@app.get("/custom-auth")
async def custom_auth(request: Request):
    try:
        logger.info("Custom auth endpoint called")
        # Create a basic user - modify this with your actual authentication logic if needed
        user = User(identifier="Test User")
        auth_response = await _authenticate_user(request, user)
        logger.info(f"Authentication response: {auth_response}")
        return auth_response
    except Exception as e:
        logger.error(f"Error in custom_auth: {str(e)}", exc_info=True)
        raise

# Mount the simpler test app instead of the complex app
logger.info("Mounting simple test Chainlit app at /chainlit")
mount_chainlit(app=app, target="simple_test.py", path="/chainlit")

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server on port 8000")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug") 