import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

type BadRequestDetails = {
	property: string;
	messages: string[];
};

const details: BadRequestDetails[] = [
	{
		property: 'name',
		messages: ['name must be a string'],
	},
];

export class BadRequestError {
	@ApiProperty({
		description: 'The error status.',
		example: HttpStatus.BAD_REQUEST,
	})
	statusCode: HttpStatus;

	@ApiProperty({
		description: 'The error name.',
		example: 'Bad Request',
	})
	error: string;

	@ApiProperty({
		description: 'The error messages.',
		example: details,
	})
	details: BadRequestDetails[];
}
