import * as passport from 'passport'

import { ExtractJwt } from 'passport-jwt'
import { Strategy } from 'passport-jwt'

import { secret } from "../config";

export class PassportConfig {
    constructor (){
        passport.use(
            new Strategy(
                {   
                    // Secret should be more complex and stored in a vault outside of dev
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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