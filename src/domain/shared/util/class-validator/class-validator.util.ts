import { validate, ValidationError } from 'class-validator';

export type ClassValidationDetails = {
	statusCode: number;
	error: string;
	details: ClassValidationErrors[];
};

export type ClassValidationErrors = {
	property: string;
	messages: string[];
};

export class ClassValidator {
	public static async validate<TTarget extends object>(
		target: TTarget
	): Promise<ClassValidationDetails> {
		let details: ClassValidationDetails;
		const errors: ValidationError[] = await validate(target);

		if (errors.length > 0) {
			details = {
				statusCode: 404,
				error: 'Bad Request',
				details: [],
			};
			for (const error of errors) {
				details.details.push({
					property: error.property,
					messages: error.constraints ? Object.values(error.constraints) : [],
				});
			}
		}

		return details;
	}
}
