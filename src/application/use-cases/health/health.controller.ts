import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	HealthCheckService,
	HealthCheck,
	HttpHealthIndicator,
	TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
		private database: TypeOrmHealthIndicator
	) {}

	@Get()
	@HealthCheck()
	public async healthCheck() {
		const host: string = process.env.HOST;
		const port: string = process.env.PORT;
		const urlApi = `http://${host}:${port}`;

		return await this.health.check([
			async () => this.database.pingCheck('database', { timeout: 10000 }),
			() => this.http.pingCheck('api', urlApi),
		]);
	}
}
