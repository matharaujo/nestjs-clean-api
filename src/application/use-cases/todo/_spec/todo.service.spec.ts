import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Todo } from 'domain/use-cases/todo/entity/todo.entity';
import { TodoService } from 'application/use-cases/todo/todo.service';
import {
	todoList,
	newTodo,
	editedTodo,
} from 'application/use-cases/todo/_spec/_mocks';

describe('Todo Service', () => {
	let service: TodoService;
	let repository: Repository<Todo>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TodoService,
				{
					provide: getRepositoryToken(Todo),
					useValue: {
						find: jest.fn().mockResolvedValue(todoList),
						findOne: jest.fn().mockResolvedValue(editedTodo),
						create: jest.fn().mockResolvedValue(newTodo),
						save: jest.fn().mockResolvedValue(newTodo),
					},
				},
			],
		}).compile();

		service = module.get<TodoService>(TodoService);
		repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});

	describe('findAll', () => {
		it('should return a todo list', async () => {
			const test = await service.findAll();

			expect(test).toEqual(todoList);
			expect(typeof test).toEqual('object');
			expect(repository.find).toHaveBeenCalledTimes(1);
			expect(test).toHaveLength(2);
		});
	});

	describe('create', () => {
		it('should create a todo', async () => {
			const test = await service.create(newTodo);

			expect(test).toEqual(newTodo);
			expect(repository.save).toHaveBeenCalledTimes(1);
		});
	});

	describe('edit', () => {
		it('should edit a todo', async () => {
			const test = await service.edit(1, editedTodo);

			expect(test).toEqual(editedTodo);
			expect(repository.save).toHaveBeenCalledTimes(1);
		});
	});
});
