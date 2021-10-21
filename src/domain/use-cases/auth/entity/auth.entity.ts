import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { IEntity } from 'domain/shared/entity/entity';
import { LoginPort } from 'domain/use-cases/auth/port/login.port';

export class Auth extends IEntity {
	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	public username: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	public password: string;

	constructor(payload?: Partial<Auth>) {
		super();
		this.username = payload?.username;
		this.password = payload?.password;
	}

	public async login(payload: LoginPort): Promise<Auth> {
		const login: Auth = new Auth(payload);

		await login.validate();

		return login;
	}
}
