import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'domain/use-cases/user/entity/user.entity';
import { UserController } from 'application/use-cases/user/user.controller';
import { UserService } from 'application/use-cases/user/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
