import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { TodoController } from 'application/use-cases/todo/todo.controller';
import { TodoService } from 'application/use-cases/todo/todo.service';
import {
	todoList,
	newTodo,
	editedTodo,
} from 'application/use-cases/todo/_spec/_mocks';

describe('Todo Controller', () => {
	let controller: TodoController;
	let service: TodoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TodoController],
			providers: [
				{
					provide: TodoService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(todoList),
						create: jest.fn().mockResolvedValue(newTodo),
						edit: jest.fn().mockResolvedValue(editedTodo),
					},
				},
			],
		}).compile();

		controller = module.get<TodoController>(TodoController);
		service = module.get<TodoService>(TodoService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		it('should return a todo list', async () => {
			const test = await controller.findAll();

			expect(test).toEqual(todoList);
			expect(typeof test).toEqual('object');
			expect(service.findAll).toHaveBeenCalledTimes(1);
			expect(test).toHaveLength(2);
		});

		it('should throw an exception', async () => {
			jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

			await expect(controller.findAll()).rejects.toThrowError();
		});
	});

	describe('create', () => {
		it('should create a todo', async () => {
			const test = await controller.create(newTodo);

			expect(test).toEqual(newTodo);
			expect(service.create).toHaveBeenCalledTimes(1);
			expect(service.create).toHaveBeenCalledWith(newTodo);
		});

		it('should throw an exception', async () => {
			jest.spyOn(service, 'create').mockRejectedValueOnce(new NotFoundException());

			await expect(controller.create(newTodo)).rejects.toThrowError();
		});
	});

	describe('edit', () => {
		it('should edit a todo', async () => {
			const test = await controller.edit(1, editedTodo);

			expect(test).toEqual(editedTodo);
			expect(service.edit).toHaveBeenCalledTimes(1);
			expect(service.edit).toHaveBeenCalledWith(1, editedTodo);
		});

		it('should throw an exception', async () => {
			jest
				.spyOn(service, 'edit')
				.mockRejectedValueOnce(new NotFoundException());

			await expect(controller.edit(1, editedTodo)).rejects.toThrowError(
				NotFoundException
			);
		});
	});
});
