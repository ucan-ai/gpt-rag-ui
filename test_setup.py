import os
import sys
import subprocess

def check_python_dependencies():
    try:
        import chainlit
        import fastapi
        import uvicorn
        print("✅ Python dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing Python dependency: {e}")
        return False
        
def check_nodejs():
    try:
        result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js is installed (npm version: {result.stdout.strip()})")
            return True
        else:
            print("❌ Node.js is not properly installed")
            return False
    except Exception:
        print("❌ Node.js is not installed or not in PATH")
        return False

def check_app_settings():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    app_settings_path = os.path.join(script_dir, 'app_settings.json')
    
    if os.path.exists(app_settings_path):
        print("✅ app_settings.json found in root directory")
        return True
    else:
        print("❌ app_settings.json not found in root directory")
        return False

def check_directories():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(script_dir, 'superdoc-backend')
    frontend_dir = os.path.join(script_dir, 'superdoc-frontend')
    
    if os.path.exists(backend_dir) and os.path.isdir(backend_dir):
        print("✅ superdoc-backend directory exists")
    else:
        print("❌ superdoc-backend directory not found")
        
    if os.path.exists(frontend_dir) and os.path.isdir(frontend_dir):
        print("✅ superdoc-frontend directory exists")
    else:
        print("❌ superdoc-frontend directory not found")
        
    return os.path.exists(backend_dir) and os.path.exists(frontend_dir)

def main():
    print("SuperDoc Setup Test")
    print("==================")
    
    checks = [
        check_python_dependencies(),
        check_nodejs(),
        check_app_settings(),
        check_directories()
    ]
    
    if all(checks):
        print("\n✅ All checks passed! Your setup looks good.")
        print("\nTo run the application:")
        print("- Run both components: .\\run-superdoc.ps1")
        print("- Run only backend: .\\run-superdoc.ps1 backend")
        print("- Run only frontend: .\\run-superdoc.ps1 frontend")
    else:
        print("\n❌ Some checks failed. Please fix the issues before running the application.")
        
if __name__ == "__main__":
    main() 