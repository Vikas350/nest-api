import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
// import * as argon from 'argon2';

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    signup(dto: AuthDto) {
        console.log(dto);
        //generate the hashed password

        //create and save the user in db

        //return the saved user
        return { msg: 'I have signed up' };
    }
    signin() {
        return { msg: 'I have signed in' };
    }
}
