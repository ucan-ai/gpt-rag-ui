import os
import json
import sys

def load_settings():
    """Load settings from app_settings.json in the root directory."""
    # Determine root directory 
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Try to find app_settings.json in current directory or parent directory
    possible_paths = [
        os.path.join(script_dir, 'app_settings.json'),  # Current directory
        os.path.join(script_dir, '..', 'app_settings.json')  # Parent directory
    ]
    
    settings_path = None
    for path in possible_paths:
        if os.path.exists(path):
            settings_path = path
            break
    
    if not settings_path:
        print("Warning: app_settings.json not found")
        return
    
    try:
        with open(settings_path, 'r') as f:
            settings = json.load(f)
        
        # Set environment variables
        for setting in settings:
            name = setting.get('name')
            value = setting.get('value')
            if name and value:
                os.environ[name] = value
                
        print(f"Loaded settings from {settings_path}")
    except Exception as e:
        print(f"Error loading settings: {e}")

if __name__ == "__main__":
    load_settings() 