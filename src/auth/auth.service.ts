import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}
    async signup(dto: AuthDto) {
        try {
            //generate the hashed password
            const hash = await argon.hash(dto.password);

            //create and save the user in db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });

            // delete user.hash; --> delete password from the db

            //return the saved user
            return this.generateSignedToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    }
    async signin(dto: AuthDto) {
        // find user by email -> if not exist throw error
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new ForbiddenException('Incorrect Credentials');
        }

        // compare password -> if incorrect throw error
        const matchPassword = await argon.verify(user.hash, dto.password);
        if (!matchPassword) {
            throw new ForbiddenException('Incorrect Password');
        }

        // send back user
        return this.generateSignedToken(user.id, user.email);
    }

    async generateSignedToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId, //sub is basically used as a field in jwt to define unique identity
            email,
        };

        const JWT_SECRET = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: JWT_SECRET,
        });

        return {
            access_token: token,
        };
    }
}
