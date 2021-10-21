import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bcrypt } from 'infrastructure/shared/bcrypt/bcrypt';
import { Auth } from 'domain/use-cases/auth/entity/auth.entity';
import { User } from 'domain/use-cases/user/entity/user.entity';
import { LoggedViewModel } from 'application/use-cases/auth/view-models/logged.view-model';
import { LoginPort } from 'domain/use-cases/auth/port/login.port';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	public async validateLogin(
		username: string,
		password: string
	): Promise<User> {
		const payload: LoginPort = { username, password };
		const auth: Auth = await new Auth().login(payload);

		const user: User = await this.userRepository.findOne({
			username: auth.username,
		});

		if (!user)
			throw new UnauthorizedException(
				'Usuário e/ou senha inválidos! Verifique!'
			);

		const passwordsMatch: boolean = await this.comparePasswords(password, user.password);

		if (!passwordsMatch)
			throw new UnauthorizedException(
				'Usuário e/ou senha inválidos! Verifique!'
			);

		return user;
	}

	public async login(payload: LoginPort): Promise<LoggedViewModel> {
		const { username, password } = payload;

		const user: User = await this.validateLogin(username, password);

		return {
			name: user.name,
			email: user.email,
			username: user.username,
			accessToken: this.jwtService.sign({
				id: user.id,
				username: user.username,
			}),
		};
	}

	public async comparePasswords(password, hashPassword): Promise<boolean> {
		return await Bcrypt.comparePasswords(password, hashPassword);
	}
}
