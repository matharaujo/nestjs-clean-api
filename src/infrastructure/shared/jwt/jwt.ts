import * as jwt from 'jsonwebtoken';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

export class Jwt {
	static async decode(authorization: string, secret?: string): Promise<any> {
		return jwt.verify(
			authorization.split(' ')[1],
			process.env.JWT_SECRET || secret,
			(error: VerifyErrors, decoded: JwtPayload) => {
				if (error) {
					throw new UnauthorizedException('Token inválido! Tente novamente!');
				}

				return decoded;
			}
		);
	}
}
