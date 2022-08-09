import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';
import { APP_TIMEOUT } from './constants';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });

  try {
    // Fargate에 Timeout 설정이 없어서 수동으로 Timeout을 설정함
    const appTimeout = setTimeout(async () => {
      await app.close();
      process.exit(0);
    }, APP_TIMEOUT);

    await app.select(CommandModule).get(CommandService).exec();
    clearTimeout(appTimeout); // APP_TIMEOUT 만큼 기다리지 않고 바로 종료하기 위해 timeout을 해제 함

    await app.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
