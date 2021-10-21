import { ApiProperty } from '@nestjs/swagger';

export class EditTodoPayload {
	@ApiProperty()
	public readonly name: string;

	@ApiProperty()
	public readonly description: string;

	@ApiProperty()
	public readonly done: boolean;
}
