import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from 'domain/use-cases/user/entity/user.entity';
import { UserService } from 'application/use-cases/user/user.service';
import { newUser } from 'application/use-cases/user/_spec/_mocks';

describe('User Service', () => {
	let service: UserService;
	let repository: Repository<User>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						findOne: jest.fn().mockResolvedValue(newUser),
						create: jest.fn().mockReturnValue(newUser),
						save: jest.fn().mockResolvedValue(newUser),
					},
				},
				{
					provide: ConfigService,
					useValue: {},
				},
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn().mockImplementation(() => 'accessToken'),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
		repository = module.get<Repository<User>>(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});

	describe('create', () => {
		it('should create a user', async () => {
			const test = await service.create(newUser);

			expect(test).toEqual(newUser);
			expect(repository.save).toHaveBeenCalledTimes(1);
		});
	});
});
