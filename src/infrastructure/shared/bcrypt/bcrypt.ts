import * as bcrypt from 'bcrypt';

export class Bcrypt {
	public static async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	public static async comparePasswords(
		password: string,
		hashPassword: string
	): Promise<boolean> {
		return await bcrypt.compare(password, hashPassword);
	}
}
