import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

      constructor(private userService:UsersService){}


    

    

}
