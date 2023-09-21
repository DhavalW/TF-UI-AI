
import adapter from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: adapter({
			// see the 'Deployment configuration' section below
			runtime: 'nodejs18.x'
		})
	}
};