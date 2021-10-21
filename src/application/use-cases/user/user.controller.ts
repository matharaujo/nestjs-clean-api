import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiTags,
	ApiInternalServerErrorResponse,
	ApiBadRequestResponse,
	ApiUnauthorizedResponse,
	ApiCreatedResponse,
	ApiOperation,
} from '@nestjs/swagger';

import { UserService } from 'application/use-cases/user/user.service';
import { UnauthorizedError } from 'infrastructure/errors/unauthorized.error';
import { InternalServerError } from 'infrastructure/errors/internal-server.error';
import { BadRequestError } from 'infrastructure/errors/bad-request.error';
import { UserViewModel } from 'application/use-cases/user/view-models/user.view-model';
import { UserResponse } from 'application/use-cases/user/documentation/response/user.response';
import { CreateUserPayload } from 'application/use-cases/user/documentation/payload/create-user.payload';

@Controller('user')
@ApiTags('User Controller')
@ApiUnauthorizedResponse({ type: UnauthorizedError })
@ApiBadRequestResponse({ type: BadRequestError })
@ApiInternalServerErrorResponse({ type: InternalServerError })
export class UserController {
	constructor(private userService: UserService) {}

	@Post('/create')
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Create a user' })
	@ApiCreatedResponse({ type: UserResponse })
	@ApiBadRequestResponse({ type: BadRequestError })
	public async create(
		@Body() payload: CreateUserPayload
	): Promise<UserViewModel> {
		return this.userService.create(payload);
	}
}
