import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { ApplicationModule } from 'application/application.module';
import { LoggingInterceptor } from 'infrastructure/interceptors/logging.interceptor';
import { TransformClassInterceptor } from 'infrastructure/interceptors/transform-class.interceptor';

declare const module: any;

async function bootstrap() {
	try {
		const app = await NestFactory.create(ApplicationModule, {
			cors: true,
			bodyParser: true,
			logger:
				process.env.NODE_ENV === 'production'
					? ['warn', 'error', 'log']
					: ['debug', 'log', 'verbose'],
		});

		Logger.log(`Environment: ${process.env.NODE_ENV?.toUpperCase()}`);

		app.use(helmet());

		app.setGlobalPrefix('api');
		app.useGlobalInterceptors(
			new LoggingInterceptor(),
			new TransformClassInterceptor()
		);
		app.useGlobalPipes(new ValidationPipe());

		const title = 'NestJS';
		const description = 'Documentation of available REST services';
		const version = '1.0.0';

		const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
			.setTitle(title)
			.setDescription(description)
			.setVersion(version)
			.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
			.build();

		const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('/', app, document, {
			swaggerOptions: { defaultModelsExpandDepth: -1 },
		});

		Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');

		const HOST = process.env.HOST;
		const PORT = process.env.PORT;

		await app.listen(PORT);
		process.env.NODE_ENV !== 'production'
			? Logger.log(`✔ Server ready at http://${HOST}:${PORT}`)
			: Logger.log(`✔ Server is listening on port ${PORT}`);

		if (module.hot) {
			module.hot.accept();
			module.hot.dispose(() => app.close());
		}
	} catch (error) {
		Logger.error(`❌ Error starting server, ${error}`);
		process.exit();
	}
}
bootstrap().catch((error) => {
	Logger.error(`❌ Error starting server, ${error}`);
	throw error;
});
