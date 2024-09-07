import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateBodySchema } from 'src/schemas/user.schema';

@Controller('/user')
export class UserCreateController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  async handle(@Body() body: UserCreateBodySchema) {
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
