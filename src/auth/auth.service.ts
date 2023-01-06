import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import * as argon  from 'argon2';
import appConfig from 'src/config/app.config';
import { AuthDTO } from 'src/dto/auth.dto';
import { UserDTO } from 'src/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

       constructor(private userService:UsersService,private jwtService:JwtService){

       }

       async register(user:UserDTO){
        const hashedPass = await this.userService.hashPassword(user.password);
        user.password =hashedPass;
        this.userService.createUser(user);

       }
       async login(auth:AuthDTO){  
       
         let user=await this.userService.getUserByEmail(auth.login);
          if(!user) user= await this.userService.getUserByUserName(auth.login);
          console.log(user) 
          if(!user)  throw new ForbiddenException('Somtehing wrong');
          let verfiyPass= argon.verify(user.password,auth.password);
          if(!verfiyPass)  throw new ForbiddenException('Somtehing wrong')
               return await this.getToken(auth);
       }


       async getToken(user:AuthDTO){
       let  token={
            access_token:await this.jwtService.signAsync({
                login:user.login
            },
            {
                secret: appConfig().secret,
                expiresIn: 60*15,
            },
            
            )
        }
       
        return token;
      
       }
}
