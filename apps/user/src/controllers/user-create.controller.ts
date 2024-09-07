import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod.validation-pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateBody, userCreateBodySchema } from 'src/schemas/user.schema';

@Controller('/user')
export class UserCreateController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(userCreateBodySchema))
  async handle(@Body() body: UserCreateBody) {
    const { name, email, password } = body;

    const userEmailExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userEmailExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(password, 5);

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
