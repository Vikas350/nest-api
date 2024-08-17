import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
    @Get('me')
    getMe(@GetUser('') user: User) {
        // console.log({
        //     user: req.user,
        // });
        return user;
    }

    @Patch()
    editUser() {}
}
