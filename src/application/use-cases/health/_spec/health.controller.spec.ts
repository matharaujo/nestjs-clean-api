import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import {
	HealthCheckService,
	HttpHealthIndicator,
	TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { HealthController } from '../health.controller';
import { status } from './_mocks';

describe('Health Controller', () => {
	let controller: HealthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: HealthCheckService,
					useValue: {
						healthCheck: jest.fn(),
						check: jest.fn().mockResolvedValue(status),
					},
				},
				{
					provide: HttpHealthIndicator,
					useValue: {},
				},
				{
					provide: TypeOrmHealthIndicator,
					useValue: {},
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
			],
			controllers: [HealthController],
		}).compile();

		controller = module.get<HealthController>(HealthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('check', () => {
		it('should return a status api', async () => {
			const data = await controller.healthCheck();

			expect(data).toEqual({
				...status,
			});
			expect(data).toHaveProperty('status');
			expect(data).toHaveProperty('info');
			expect(data).toHaveProperty('error');
			expect(data).toHaveProperty('details');
		});
	});
});
