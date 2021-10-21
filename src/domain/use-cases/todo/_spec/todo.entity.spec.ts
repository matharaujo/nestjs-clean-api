import { Todo } from 'domain/use-cases/todo/entity/todo.entity';
import { newTodo } from 'domain/use-cases/todo/_spec/_mocks';

describe('Todo Entity', () => {
	it('should create a todo', () => {
		const todo: Todo = new Todo(newTodo);

		expect(typeof todo.id).toBe('number');
		expect(typeof todo.name).toBe('string');
		expect(typeof todo.description).toBe('string');
		expect(typeof todo.done).toBe('boolean');
		expect(typeof todo.updatedAt).toBe('object');
		expect(typeof todo.createdAt).toBe('object');

		expect(todo.id).toBe(newTodo.id);
		expect(todo.name).toBe(newTodo.name);
		expect(todo.description).toBe(newTodo.description);
		expect(todo.done).toBe(newTodo.done);
		expect(todo.updatedAt).toBe(newTodo.updatedAt);
		expect(todo.createdAt).toBe(newTodo.createdAt);
	});
});
