import { BadRequestException } from '@nestjs/common';

import {
	ClassValidationDetails,
	ClassValidator,
} from '../util/class-validator/class-validator.util';

export class IEntity {
	public async validate(): Promise<void> {
		const errors: ClassValidationDetails = await ClassValidator.validate(this);
		if (errors) {
			console.log(errors.details);
			throw new BadRequestException(errors);
		}
	}
}
