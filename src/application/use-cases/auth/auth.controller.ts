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

import { AuthService } from 'application/use-cases/auth/auth.service';
import { UnauthorizedError } from 'infrastructure/errors/unauthorized.error';
import { InternalServerError } from 'infrastructure/errors/internal-server.error';
import { BadRequestError } from 'infrastructure/errors/bad-request.error';
import { LoggedViewModel } from 'application/use-cases/auth/view-models/logged.view-model';
import { LoggedResponse } from 'application/use-cases/auth/documentation/response/logged.response';
import { LoginPayload } from 'application/use-cases/auth/documentation/payload/login.payload';

@Controller('auth')
@ApiTags('Auth Controller')
@ApiUnauthorizedResponse({ type: UnauthorizedError })
@ApiBadRequestResponse({ type: BadRequestError })
@ApiInternalServerErrorResponse({ type: InternalServerError })
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Login' })
	@ApiCreatedResponse({ type: LoggedResponse })
	@ApiBadRequestResponse({ type: BadRequestError })
	public async login(@Body() payload: LoginPayload): Promise<LoggedViewModel> {
		return this.authService.login(payload);
	}
}
