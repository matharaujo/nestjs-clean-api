import { UserViewModel } from '../view-models/user.view-model';

const currentDate = new Date();
export const newUser: UserViewModel = {
	id: 1,
	name: 'Krusty',
	email: 'krusty@email.com',
	username: 'krusty',
	password: '123456',
	updatedAt: currentDate,
	createdAt: currentDate,
};
