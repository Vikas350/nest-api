import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule); // initialize an app
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, //this strip the body and take only defined params in dto
        }),
    ); // this is to use validation pipes in dto
    await app.listen(3333);
}
bootstrap();
