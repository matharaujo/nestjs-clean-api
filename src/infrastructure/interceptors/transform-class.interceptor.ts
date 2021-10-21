import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TransformClassInterceptor implements NestInterceptor {
	public intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<any> {
		return next.handle().pipe(map((data) => classToPlain(data)));
	}
}
