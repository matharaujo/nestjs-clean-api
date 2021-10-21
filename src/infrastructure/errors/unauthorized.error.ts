import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedError {
	@ApiProperty({
		description: 'The error status.',
		example: HttpStatus.UNAUTHORIZED,
	})
	statusCode: HttpStatus;

	@ApiProperty({
		description: 'The error message.',
		example: 'Unauthorized',
	})
	message: string;
}
