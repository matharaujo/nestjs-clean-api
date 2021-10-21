import { Auth } from 'domain/use-cases/auth/entity/auth.entity';
import { newLogin } from 'domain/use-cases/auth/_spec/_mocks';

describe('Auth Entity', () => {
	it('should create a auth', () => {
		const auth: Auth = new Auth(newLogin);

		expect(typeof auth.username).toBe('string');
		expect(typeof auth.password).toBe('string');

		expect(auth.username).toBe(newLogin.username);
		expect(auth.password).toBe(newLogin.password);
	});
});
