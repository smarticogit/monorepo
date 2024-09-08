import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CreateUrlController } from './controllers/url/create-url.controller';
import { DeleteUrlController } from './controllers/url/delete-url.controller';
import { FindAllUrlController } from './controllers/url/find-all-url.controller';
import { FindUrlController } from './controllers/url/find-url.controller';
import { UpdateUrlController } from './controllers/url/update-url.controller';
import { AuthController } from './controllers/user/auth.controller';
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
  controllers: [
    CreateUrlController,
    FindAllUrlController,
    UpdateUrlController,
    FindUrlController,
    DeleteUrlController,
    AuthController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
