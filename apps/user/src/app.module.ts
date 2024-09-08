import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { CreateUserController } from './controllers/create-user.controller';
import { FindAllUserController } from './controllers/find-all-user.controller';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [CreateUserController, FindAllUserController, AuthController],
  providers: [PrismaService],
})
export class AppModule {}
