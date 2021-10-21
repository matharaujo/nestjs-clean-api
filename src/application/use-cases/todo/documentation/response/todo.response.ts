import { ApiProperty } from '@nestjs/swagger';

export class TodoResponse {
	@ApiProperty()
	public readonly id: number;

	@ApiProperty()
	public readonly name: string;

	@ApiProperty()
	public readonly description: string;

	@ApiProperty()
	public readonly done: boolean;

	@ApiProperty()
	public readonly updatedAt: Date;

	@ApiProperty()
	public readonly createdAt: Date;
}
