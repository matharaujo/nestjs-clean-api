import { Todo } from 'domain/use-cases/todo/entity/todo.entity';

const currentDate = new Date();
export const newTodo: Todo = new Todo({
	id: 1,
	name: 'Todo 1',
	description: 'Todo description',
	done: true,
	updatedAt: currentDate,
	createdAt: currentDate,
});
