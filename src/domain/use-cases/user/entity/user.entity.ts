import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
	IsString,
	MaxLength,
	IsEmail,
	IsOptional,
	IsDate,
	IsNotEmpty,
} from 'class-validator';

import { IEntity } from 'domain/shared/entity/entity';
import { CreateUserPort } from 'domain/use-cases/user/port/create-user.port';
import { Bcrypt } from 'infrastructure/shared/bcrypt/bcrypt';

@Entity({ schema: 'admin', name: 'users' })
export class User extends IEntity {
	@PrimaryGeneratedColumn()
	public readonly id: number;

	@IsNotEmpty()
	@IsString()
	@MaxLength(80)
	@Column()
	public name: string;

	@IsNotEmpty()
	@IsEmail()
	@MaxLength(80)
	@Column()
	public email: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	@Column()
	public username: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	@Column()
	public password: string;

	@IsOptional()
	@IsNotEmpty()
	@IsDate()
	@Column()
	public updatedAt: Date;

	@IsNotEmpty()
	@IsDate()
	@Column()
	public createdAt: Date;

	constructor(payload?: Partial<User>) {
		super();
		this.id = payload?.id;
		this.name = payload?.name;
		this.email = payload?.email;
		this.username = payload?.username;
		this.password = payload?.password;
		this.updatedAt = payload?.updatedAt;
		this.createdAt = payload?.createdAt;
	}

	public async new(payload: CreateUserPort): Promise<User> {
		const user: User = new User(payload);
		user.createdAt = new Date();

		await user.validate();

		user.password = await Bcrypt.hashPassword(user.password);

		return user;
	}
}
