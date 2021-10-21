import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from 'application/use-cases/user/user.controller';
import { UserService } from 'application/use-cases/user/user.service';
import { newUser } from 'application/use-cases/user/_spec/_mocks';

describe('User Controller', () => {
	let controller: UserController;
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						create: jest.fn().mockResolvedValue(newUser),
					},
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a user', async () => {
			const test = await controller.create(newUser);

			expect(test).toEqual(newUser);
			expect(service.create).toHaveBeenCalledTimes(1);
			expect(service.create).toHaveBeenCalledWith(newUser);
		});

		it('should throw an exception', async () => {
			jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

			await expect(controller.create(newUser)).rejects.toThrowError();
		});
	});
});
