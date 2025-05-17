import chainlit as cl
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@cl.on_chat_start
async def start():
    logger.info("Chat started. Sending welcome message.")
    await cl.Message(content="Hello from the simple test app! Try sending a message.").send()

@cl.on_message
async def main(message: cl.Message):
    logger.info(f"Received message: {message.content}")
    
    # Simply echo back the user's message with a prefix
    response = f"You said: {message.content}"
    
    logger.info(f"Sending response: {response}")
    await cl.Message(content=response).send() 