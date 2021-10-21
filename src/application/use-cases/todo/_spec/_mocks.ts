import { TodoViewModel } from 'application/use-cases/todo/view-models/todo.view-model';

const currentDate = new Date();
export const todoList: TodoViewModel[] = [
	{
		id: 1,
		name: 'Todo 1',
		description: 'Todo description',
		done: true,
		updatedAt: currentDate,
		createdAt: currentDate,
	},
	{
		id: 2,
		name: 'Todo 2',
		description: 'Todo description',
		done: true,
		updatedAt: currentDate,
		createdAt: currentDate,
	},
];

export const newTodo: TodoViewModel = {
	id: 1,
	name: 'Todo 1',
	description: 'Todo description',
	done: false,
	updatedAt: currentDate,
	createdAt: currentDate,
};

export const editedTodo: TodoViewModel = Object.assign(newTodo, {
	id: 1,
	name: 'Todo 1',
	description: 'Todo description',
	done: true,
	updatedAt: currentDate,
	createdAt: currentDate,
});
