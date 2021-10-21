import * as jwt from 'jsonwebtoken';

import { Jwt } from '../jwt';

describe('Jwt', () => {
	const secret = 'secret';

	it('should return if token is valid', async () => {
		const payload = { test: 1 };
		const jwtToken = await jwt.sign(payload, secret);

		expect(await Jwt.decode(`Bearer ${jwtToken}`, secret)).toEqual({
			iat: expect.any(Number),
			...payload,
		});
	});

	it('should return error if token is invalid', async () => {
		await expect(Jwt.decode('Bearer invalidToken', secret)).rejects.toThrow(
			'Token inválido! Tente novamente!'
		);
	});
});
