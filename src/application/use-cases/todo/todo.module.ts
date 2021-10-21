import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from 'domain/use-cases/todo/entity/todo.entity';
import { TodoController } from 'application/use-cases/todo/todo.controller';
import { TodoService } from 'application/use-cases/todo/todo.service';

@Module({
	imports: [TypeOrmModule.forFeature([Todo])],
	controllers: [TodoController],
	providers: [TodoService],
})
export class TodoModule {}
