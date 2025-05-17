# Custom React Frontend for GPT-RAG UI

This is a custom React frontend for the GPT-RAG UI application that integrates the ElevenLabs ConvAI widget.

## Tech Stack

- React 18
- Vite as the build tool
- Tailwind CSS for styling
- @chainlit/react-client 0.2.2 for Chainlit integration
- ElevenLabs ConvAI Widget for voice interaction

## Setup Instructions

### 1. Install Dependencies

Navigate to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```

### 2. Development Mode

To run the React frontend in development mode:

```bash
npm run dev
```

This will start the development server on port 5173 by default (http://localhost:5173).
The development server proxies API requests to the Chainlit backend running on port 8000.

### 3. Building for Production

To build the frontend for production:

```bash
npm run build
```

This will create a production build in the `.chainlit/frontend` directory, which Chainlit will serve automatically.

### 4. Running the Full Application

Run the Chainlit application as usual:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Chainlit will detect and serve your custom frontend.

## Features

- Full React integration with Chainlit
- ElevenLabs ConvAI widget integrated in the UI
- Tailwind CSS for modern styling
- Customizable UI components
- Access to all Chainlit functionality through the `@chainlit/react-client` package

## Customization

You can customize the UI by modifying the following files:

- `src/App.jsx`: Main application component
- `src/styles.css`: Global styles and Tailwind directives
- `tailwind.config.cjs`: Tailwind configuration (note the .cjs extension)
- `src/components/`: Add custom components here

## Alternative Simple Implementation

If you encounter issues with the Chainlit React client library, you can use the simplified implementation:

1. Use the provided simplified version:
   ```bash
   # Copy the simplified main entry point
   cp src/main-simple.jsx src/main.jsx
   npm run build
   ```

2. Or directly edit the import in `index.html` to use SimpleApp instead.

The simplified version only adds the ElevenLabs widget without trying to integrate with Chainlit's React client.

## Troubleshooting

### Chainlit React Client Version Issues

The current implementation uses version 0.2.2 of `@chainlit/react-client` with the following specifics:

1. Import syntax: 
   ```javascript
   import { Chainlit } from '@chainlit/react-client';
   ```

2. Component usage:
   ```jsx
   <Chainlit projectId="gptrag-frontend">
     <CustomUI />
   </Chainlit>
   ```

3. The `ChainlitClient` class is NOT available in version 0.2.2.

If you need to check available imports:
```bash
# See what exports are available
cat node_modules/@chainlit/react-client/dist/index.mjs | grep "export"
```

### CSS/Styling Issues

If you encounter styling issues, make sure the Tailwind CSS is properly configured:

1. Check that `tailwind.config.cjs` and `postcss.config.cjs` are in the frontend directory
2. Make sure the Tailwind directives are in the styles.css file
3. The `.cjs` extension is important as it signifies CommonJS format when using "type": "module" in package.json
4. Run the build process again

### Module Format Issues

If you encounter errors about "module is not defined" or ES modules vs. CommonJS:
1. Configuration files like PostCSS and Tailwind need to use the `.cjs` extension
2. This is because the package.json has `"type": "module"` which treats `.js` files as ES modules
3. Files with `.cjs` extension are treated as CommonJS even when `"type": "module"` is set

## References

This implementation is based on the Chainlit cookbook example:
https://github.com/Chainlit/cookbook/tree/main/custom-frontend/frontend 