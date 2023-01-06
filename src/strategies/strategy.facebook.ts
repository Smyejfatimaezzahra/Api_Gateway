import { PassportStrategy } from "@nestjs/passport";
import {Profile,Strategy} from "passport-facebook";
import appConfig from "src/config/app.config";

export class facebookStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        clientID: appConfig().fb_id,
        clientSecret:appConfig().fb_secret,
        callbackURL: "http://localhost:3000/auth/facebook/redirect",
        scope: "email",
        enableProof: true,
        profileFields: ["emails", "name"],
      });
    }
  
    async validate(
      accessToken: string,
      profile: any,
      done: (err: any, user: any, info?: any) => void
    ): Promise<any> {
      console.log(profile);

      const { name, emails } = profile;
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
      };
      const payload = {
        user,
        accessToken,
      };
      done(null, payload);
    }
  }