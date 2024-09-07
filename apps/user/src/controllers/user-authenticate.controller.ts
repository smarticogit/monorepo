import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod.validation-pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UserAuthBodySchema,
  userAuthBodySchema,
} from 'src/schemas/user.schema';

@Controller('/auth')
export class UserAuthenticateController {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(userAuthBodySchema))
  async handle(@Body() body: UserAuthBodySchema) {
    const { email, password } = body;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const validPassword = await compare(password, user.password);

    if (!validPassword) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.jwtService.sign({ sub: user.id });
    return {
      token: `Bearer ${accessToken}`,
    };
  }
}
