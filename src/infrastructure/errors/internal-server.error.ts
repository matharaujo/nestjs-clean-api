import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InternalServerError {
	@ApiProperty({
		description: 'The error status.',
		example: HttpStatus.INTERNAL_SERVER_ERROR,
	})
	statusCode: HttpStatus;

	@ApiProperty({
		description: 'The error message.',
		example: 'Internal server error',
	})
	message: string;
}
