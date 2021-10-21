import {
	Controller,
	UseGuards,
	Get,
	Post,
	Put,
	Body,
	Param,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiOperation,
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiUnauthorizedResponse,
	ApiParam,
	ApiNotFoundResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'infrastructure/security/jwt/jwt-auth.guard';
import { TodoService } from 'application/use-cases/todo/todo.service';
import { UnauthorizedError } from 'infrastructure/errors/unauthorized.error';
import { InternalServerError } from 'infrastructure/errors/internal-server.error';
import { BadRequestError } from 'infrastructure/errors/bad-request.error';
import { NotFoundError } from 'infrastructure/errors/not-found.error';
import { TodoViewModel } from 'application/use-cases/todo/view-models/todo.view-model';
import { TodoResponse } from 'application/use-cases/todo/documentation/response/todo.response';
import { CreateTodoPayload } from 'application/use-cases/todo/documentation/payload/create-todo.payload';
import { EditTodoPayload } from 'application/use-cases/todo/documentation/payload/edit-todo.payload';

@ApiTags('Todo Controller')
@Controller('todo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ type: UnauthorizedError })
@ApiInternalServerErrorResponse({ type: InternalServerError })
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get()
	@ApiOperation({ summary: 'Find all todos' })
	@ApiOkResponse({ type: TodoResponse, isArray: true })
	public async findAll(): Promise<TodoViewModel[]> {
		return this.todoService.findAll();
	}

	@Post('/create')
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Create a todo' })
	@ApiCreatedResponse({ type: TodoResponse })
	@ApiBadRequestResponse({ type: BadRequestError })
	public async create(
		@Body() payload: CreateTodoPayload
	): Promise<TodoViewModel> {
		return this.todoService.create(payload);
	}

	@Put('/edit/id/:id')
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Edit a todo' })
	@ApiParam({ name: 'id', type: Number, description: 'Todo ID' })
	@ApiOkResponse({ type: TodoResponse })
	@ApiNotFoundResponse({ type: NotFoundError })
	@ApiBadRequestResponse({ type: BadRequestError })
	public async edit(
		@Param('id') id: number,
		@Body() payload: EditTodoPayload
	): Promise<TodoViewModel> {
		return this.todoService.edit(id, payload);
	}
}
