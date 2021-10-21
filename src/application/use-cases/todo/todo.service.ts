import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from 'domain/use-cases/todo/entity/todo.entity';
import { TodoViewModel } from 'application/use-cases/todo/view-models/todo.view-model';
import { CreateTodoPort } from 'domain/use-cases/todo/port/create-todo.port';
import { EditTodoPort } from 'domain/use-cases/todo/port/edit-todo.port';

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private readonly todoRepository: Repository<Todo>
	) {}

	public async findAll(): Promise<TodoViewModel[]> {
		return this.todoRepository.find();
	}

	public async create(payload: CreateTodoPort): Promise<TodoViewModel> {
		const todo: Todo = await new Todo().new(payload);

		return this.todoRepository.save(todo);
	}

	public async edit(
		id: number,
		payload: EditTodoPort
	): Promise<TodoViewModel> {
		const todo: Todo = await this.todoRepository.findOne(id);

		if (!todo) throw new NotFoundException('ToDo não encontrado! Verifique!');

		todo.name = payload.name;
		todo.description = payload.description;
		todo.done = payload.done;
		todo.updatedAt = new Date();

		await new Todo().edit(todo);

		return this.todoRepository.save(todo);
	}
}
