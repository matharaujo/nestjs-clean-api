import * as moment from 'moment';

import { User } from 'domain/use-cases/user/entity/user.entity';

const currentDate = new Date(moment().format());
export const newUser: User = new User({
	id: 1,
	name: 'Krusty',
	email: 'krusty@email.com',
	username: 'krusty',
	password: '123456',
	updatedAt: currentDate,
	createdAt: currentDate,
});
