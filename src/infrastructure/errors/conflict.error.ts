import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ConflictError {
	@ApiProperty({
		description: 'The error status.',
		example: HttpStatus.CONFLICT,
	})
	statusCode: HttpStatus;

	@ApiProperty({
		description: 'The error name.',
		example: 'Conflict',
	})
	error: string;
}
