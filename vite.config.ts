import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "process.env": {
      REACT_APP_API_URL: "https://my-u-library-backend-yosa.herokuapp.com/api",
    },
  },
});
