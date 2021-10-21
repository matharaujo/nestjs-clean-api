import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'domain/use-cases/user/entity/user.entity';
import { UserViewModel } from 'application/use-cases/user/view-models/user.view-model';
import { CreateUserPort } from 'domain/use-cases/user/port/create-user.port';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	public async create(payload: CreateUserPort): Promise<UserViewModel> {
		const user: User = await new User().new(payload);

		return await this.userRepository.save(user);
	}
}
