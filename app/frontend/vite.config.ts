import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import lucidePreprocess from "vite-plugin-lucide-preprocess";

export default defineConfig(({ mode }) => {
	// Load env file from root directory
	const env = loadEnv(mode, resolve(process.cwd(), '../../'), '');
	return {
		plugins: [lucidePreprocess(), tailwindcss(), sveltekit()],
		server: {
			port: Number(env.CLIENT_PORT) || 5175,
			host: env.CLIENT_HOST || '0.0.0.0',
			proxy: {
				'/api': `http://localhost:3112`,
			},
			allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', 'olusesilogistics.com'],
		},
		envDir: resolve(process.cwd(), '../../'),
		optimizeDeps: {
			include: ['svelte5-chartjs']
		},
		build: {
			commonjsOptions: {
				include: ['./node_modules/svelte-chartjs/**', './node_modules/chart.js/**']
			}
		}
	};
});
