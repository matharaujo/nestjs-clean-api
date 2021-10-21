import { User } from 'domain/use-cases/user/entity/user.entity';
import { newUser } from 'domain/use-cases/user/_spec/_mocks';

describe('User Entity', () => {
	it('should create a user', () => {
		const user: User = new User(newUser);

		expect(typeof user.id).toBe('number');
		expect(typeof user.name).toBe('string');
		expect(typeof user.email).toBe('string');
		expect(typeof user.username).toBe('string');
		expect(typeof user.password).toBe('string');
		expect(typeof user.updatedAt).toBe('object');
		expect(typeof user.createdAt).toBe('object');

		expect(user.id).toBe(newUser.id);
		expect(user.name).toBe(newUser.name);
		expect(user.email).toBe(newUser.email);
		expect(user.username).toBe(newUser.username);
		expect(user.password).toBe(newUser.password);
		expect(user.updatedAt).toBe(newUser.updatedAt);
		expect(user.createdAt).toBe(newUser.createdAt);
	});
});
