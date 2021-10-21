import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from 'domain/use-cases/user/entity/user.entity';
import { AuthService } from 'application/use-cases/auth/auth.service';
import { login, userFound, logged } from 'application/use-cases/auth/_spec/_mocks';

describe('Auth Service', () => {
	let service: AuthService;
	let repository: Repository<User>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						login: jest.fn().mockResolvedValue(logged),
						findOne: jest.fn().mockResolvedValue(userFound),
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

		service = module.get<AuthService>(AuthService);
		repository = module.get<Repository<User>>(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});

	describe('login', () => {
		it('should login', async () => {
			jest.spyOn(service, 'comparePasswords').mockResolvedValue(true);
			const test = await service.login(login);

			expect(test).toEqual(logged);
			expect(service.comparePasswords).toHaveBeenCalledTimes(1);
		});

		it('should throw an exception if no user is found', async () => {
			jest
				.spyOn(repository, 'findOne')
				.mockRejectedValueOnce(new Error());

			await expect(service.login(login)).rejects.toThrowError();
		});
	});
});
