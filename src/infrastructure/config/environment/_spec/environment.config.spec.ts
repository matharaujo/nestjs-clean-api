import { Environment } from 'infrastructure/config/environment/environment.config';

describe('Config Environment', () => {
	it('should return .env if NODE_ENV is production', () => {
		process.env.NODE_ENV = 'production';

		expect(Environment.setEnvironment()).toBe('.env');
	});

	it('should return .end.development if NODE_ENV is development', () => {
		process.env.NODE_ENV = 'development';

		expect(Environment.setEnvironment()).toBe('.env.development');
	});

	it('should return .env.development if NODE_ENV is empty', () => {
		process.env.NODE_ENV = '';

		expect(Environment.setEnvironment()).toBe('.env.development');
	});
});
