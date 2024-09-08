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
import { AuthBody, authSchema } from 'src/schemas/user.schema';

@Controller('/auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authSchema))
  async handle(@Body() body: AuthBody) {
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
