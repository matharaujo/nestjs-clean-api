import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { login, logged } from './_mocks';

describe('Auth Controller', () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						login: jest.fn().mockResolvedValue(logged),
					},
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	describe('login', () => {
		it('should login', async () => {
			const test = await controller.login(login);

			expect(test).toEqual(logged);
			expect(service.login).toHaveBeenCalledTimes(1);
			expect(service.login).toHaveBeenCalledWith(login);
		});

		it('should throw an exception', async () => {
			jest.spyOn(service, 'login').mockRejectedValueOnce(new Error());

			await expect(controller.login(login)).rejects.toThrowError();
		});
	});
});
