import * as bcrypt from 'bcrypt';

import { Bcrypt } from '../bcrypt';

describe('Bcrypt', () => {
	it('should return true if matching passwords', async () => {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash('123456', salt);

		expect(await Bcrypt.comparePasswords('123456', hashPassword)).toBe(true);
	});

	it('should return false if not matching passwords', async () => {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash('123456', salt);

		expect(await Bcrypt.comparePasswords('654321', hashPassword)).toBe(false);
	});
});
