import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
	IsNotEmpty,
	IsString,
	IsBoolean,
	IsDate,
	IsOptional,
	MaxLength,
} from 'class-validator';

import { IEntity } from 'domain/shared/entity/entity';
import { CreateTodoPort } from 'domain/use-cases/todo/port/create-todo.port';
import { EditTodoPort } from 'domain/use-cases/todo/port/edit-todo.port';

@Entity({ schema: 'postgres', name: 'todo' })
export class Todo extends IEntity {
	@PrimaryGeneratedColumn()
	public readonly id: number;

	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	@Column()
	public name: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(200)
	@Column()
	public description: string;

	@IsNotEmpty()
	@IsBoolean()
	@Column()
	public done: boolean;

	@IsOptional()
	@IsNotEmpty()
	@IsDate()
	@Column({ default: null })
	public updatedAt: Date;

	@IsOptional()
	@IsNotEmpty()
	@IsDate()
	@Column()
	public createdAt: Date;

	constructor(payload?: Partial<Todo>) {
		super();
		this.id = payload?.id;
		this.name = payload?.name;
		this.description = payload?.description;
		this.done = payload?.done;
		this.updatedAt = payload?.updatedAt;
		this.createdAt = payload?.createdAt;
	}

	public async new(payload: CreateTodoPort): Promise<Todo> {
		const todo: Todo = new Todo(payload);
		todo.createdAt = new Date();

		await todo.validate();

		return todo;
	}

	public async edit(payload: EditTodoPort): Promise<void> {
		this.name = payload.name;
		this.description = payload.description;
		this.done = payload.done;

		await this.validate();
	}
}
