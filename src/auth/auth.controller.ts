import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    // this constructor initiate the service in the controller
    // so that we can use it's business logic functions.
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(
        @Body() dto: AuthDto,
        // @Body('email') email: string,
        // @Body('password', ParseIntPipe) password: string, //this pipe convert string into int
    ) {
        console.log({ dto });
        // console.log({
        //     email,
        //     typeOfEmail: typeof email,
        //     password,
        //     typeOfPassword: typeof password,
        // });
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}
