import { auth } from 'express-oauth2-jwt-bearer';

export const authMiddleware = auth({
    audience: process.env.AUTH0_DOMAIN,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE
});
