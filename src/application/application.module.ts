import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Environment } from 'infrastructure/config/environment/environment.config';
import { HealthModule } from 'application/use-cases/health/health.module';
import { AuthModule } from 'application/use-cases/auth/auth.module';
import { UserModule } from 'application/use-cases/user/user.module';
import { TodoModule } from 'application/use-cases/todo/todo.module';

@Module({
	imports: [
		HealthModule,
		AuthModule,
		UserModule,
		TodoModule,
		TypeOrmModule.forRoot(),
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			envFilePath: Environment.setEnvironment(),
		}),
		CacheModule.registerAsync({
			useFactory: () => ({
				ttl: 5,
				max: 10,
			}),
		}),
		ThrottlerModule.forRootAsync({
			useFactory: () => ({
				ttl: 60,
				limit: 10,
			}),
		}),
		AuthModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class ApplicationModule {
	constructor(private readonly connection: Connection) {}
}
