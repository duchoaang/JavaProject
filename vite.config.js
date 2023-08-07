import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
            { find: '~', replacement: path.resolve(__dirname, 'src') },
        ],
    },
    build: {
        outDir: 'build',
    },
    server: {
        host: 'localhost',
        port: 3000,
        open: 'http://localhost:3000',
        //proxy: {
        //    '/static': {
        //        target: 'http://127.0.0.1:8080',
        //        changeOrigin: true,
        //        secure: false,
        //    },
        //},
    },
});
