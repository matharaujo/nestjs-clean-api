export class Environment {
	static setEnvironment(): string {
		switch (process.env.NODE_ENV) {
			case 'development':
				return '.env.development';
			case 'production':
				return '.env';
			default:
				return '.env.development';
		}
	}
}
