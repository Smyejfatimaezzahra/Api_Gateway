import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import {ExtractJwt,Strategy} from 'passport-jwt';
import appConfig from "src/config/app.config";
import { Injectable } from '@nestjs/common';
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy,'jwt') {

    constructor() { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:appConfig().secret,
        });
    }
    async validate(payload){
        return payload.login;
    }

}