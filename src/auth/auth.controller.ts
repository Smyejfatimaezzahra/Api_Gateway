import { Controller, Post , Body,Res} from '@nestjs/common';
import { Get, Req } from '@nestjs/common/';
import { UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { UserDTO } from 'src/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
@Public()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) { }

     
    @Post('register')
    async createUser(@Body() user:UserDTO){
      return this.authService.register(user);
    }

    @Post('login')
    async login( @Body() user: UserDTO,
    @Res({ passthrough: true }) response: Response){
      let token=await this.authService.login(user);
      await response.cookie('auth-cookie', token, { httpOnly: true });
      return token;
    }


    
    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
    
    }
  
    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req: Request): Promise<any> {
     
    }

}
