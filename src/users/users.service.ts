import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2'
import { Model } from 'mongoose';
import { UserDTO } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/schemas/users.schemas';

@Injectable()
export class UsersService {

    constructor(@InjectModel("User") private userModel: Model<User>) {


    }



    async createUser(user: UserDTO): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }


    async getUserByEmail(email): Promise<User> {
        return this.userModel.findOne({ email: email }).exec();
    }

   
    async getUserByUserName(username): Promise<User> {
        return this.userModel.findOne({ username: username }).exec();
    }
   
     async hashPassword(password){
        return argon2.hash(password);
     }
}
