import { LoginPayload } from 'application/use-cases/auth/documentation/payload/login.payload';
import { LoggedViewModel } from 'application/use-cases/auth/view-models/logged.view-model';
import { UserViewModel } from 'application/use-cases/user/view-models/user.view-model';

export const login: LoginPayload = {
	username: 'krusty',
	password: '123456',
};

const currentDate = new Date();
export const userFound: UserViewModel = {
	id: 1,
	name: 'Krusty',
	email: 'krusty@email.com',
	username: 'krusty',
	password: '123456',
	updatedAt: currentDate,
	createdAt: currentDate,
}

export const logged: LoggedViewModel = {
	username: 'krusty',
	name: 'Krusty',
	email: 'krusty@email.com',
	accessToken: 'accessToken',
};
