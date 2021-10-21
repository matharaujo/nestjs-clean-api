import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
	@ApiProperty()
	public readonly id: number;

	@ApiProperty()
	public readonly name: string;

	@ApiProperty()
	public readonly email: string;

	@ApiProperty()
	public readonly username: string;

	@ApiProperty()
	public readonly password: string;

	@ApiProperty()
	public readonly updatedAt: Date;

	@ApiProperty()
	public readonly createdAt: Date;
}
