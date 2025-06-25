import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@components": path.resolve(__dirname, "src/components"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@providers": path.resolve(__dirname, "src/providers")
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'react-core': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // UI Libraries
          'ui-icons': ['lucide-react', 'react-icons'],
          
          // Forms
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Charts
          'charts': ['recharts'],
          
          // Payment
          'stripe': ['@stripe/react-stripe-js', '@stripe/stripe-js'],
          
          // Admin specific
          'admin': ['@tanstack/react-table', '@tanstack/react-query'],
          
          // Utilities
          'utils': ['axios', 'clsx', 'tailwind-merge'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'react-icons',
    ],
    exclude: [
      '@tanstack/react-query',
      '@tanstack/react-table',
      'recharts',
    ],
  },
});
