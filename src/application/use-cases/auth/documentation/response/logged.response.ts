import { ApiProperty } from '@nestjs/swagger';

export class LoggedResponse {
	@ApiProperty()
	public readonly name: string;

	@ApiProperty()
	public readonly email: string;

	@ApiProperty()
	public readonly username: string;

	@ApiProperty()
	public readonly accessToken: string;
}
