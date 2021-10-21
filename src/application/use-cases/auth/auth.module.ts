import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from 'infrastructure/security/jwt/jwt.strategy';
import { User } from 'domain/use-cases/user/entity/user.entity';
import { AuthController } from 'application/use-cases/auth/auth.controller';
import { AuthService } from 'application/use-cases/auth/auth.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule,
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: process.env.JWT_SECRET,
				signOptions: { expiresIn: process.env.JWT_EXPIRE },
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
