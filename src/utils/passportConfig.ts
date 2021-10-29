import * as passport from 'passport'

import { ExtractJwt } from 'passport-jwt'
import { Strategy } from 'passport-jwt'

import { secret } from "../config";

export class PassportConfig {
    constructor (){
        passport.use(
            new Strategy(
                {   
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    // Secret should be more complex and stored in a vault outside of dev
                    secretOrKey: secret,
                },
                async(token, done) => {
                    try{
                        return done(null, token.user)
                    }catch(error){
                        done(error)
                    }
                }
            )
        )
    }
}