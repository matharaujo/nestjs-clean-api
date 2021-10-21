import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
	@ApiProperty()
	public readonly username: string;

	@ApiProperty()
	public readonly password: string;
}
