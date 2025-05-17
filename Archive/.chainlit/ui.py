from typing import Dict, Any

# This customizes the UI elements
ui_settings: Dict[str, Any] = {
    # Define custom UI settings here
    # These will be applied to the Chainlit UI
}

# Adding a script for the ElevenLabs widget 
js_scripts = [
    {
        "src": "https://elevenlabs.io/convai-widget/index.js",
        "defer": True
    }
]

# Custom HTML to inject
html_head = """
<!-- Any custom head HTML can go here -->
"""

html_body = """
<!-- ElevenLabs ConvAI Widget -->
<div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
    <elevenlabs-convai agent-id="TNIqReT9FMZb24QHSdCj"></elevenlabs-convai>
</div>
""" 