
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define environment variables that will be available in the client
    define: {
      'process.env.CONTENTFUL_SPACE_ID': JSON.stringify(env.CONTENTFUL_SPACE_ID || '9ohibvmav2q6'),
      'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify(env.CONTENTFUL_ACCESS_TOKEN || 'jQeUyyAvnIvppIc41r4dGL2hnfnUy8uIiTDjFcSKRGc'),
      'process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN': JSON.stringify(env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || 'GqVPWPDsrZgZ66u5Ox1uHxJ3ZIx0PO6cAvbcvHpvAqc'),
    }
  };
});
