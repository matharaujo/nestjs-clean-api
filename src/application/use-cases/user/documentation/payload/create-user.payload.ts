import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserPayload {
	@IsNotEmpty()
	@ApiProperty()
	public readonly name: string;

	@IsNotEmpty()
	@ApiProperty()
	public readonly email: string;

	@IsNotEmpty()
	@ApiProperty()
	public readonly username: string;

	@IsNotEmpty()
	@ApiProperty()
	public readonly password: string;
}
