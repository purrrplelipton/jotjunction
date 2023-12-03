import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			'@src': resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 4000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
			},
		},
	},
	css: {
		modules: {
			localsConvention: 'camelCase',
		},
	},
});
