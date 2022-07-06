import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import * as session from 'express-session';
// import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(session({
  //   secret: 'keyboard cat',
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie: { maxAge: 3600000 }
  // }))

  // app.use(passport.initialize());
  // app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  // const config = new DocumentBuilder()
  //     .setTitle('Nest API')
  //     .setDescription('The descreption API')
  //     .setVersion('1.0')
  //     .build();

  // const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
