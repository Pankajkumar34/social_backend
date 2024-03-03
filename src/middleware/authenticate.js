import jwt from 'jsonwebtoken';
import session from 'express-session';
export const LogoutToken = []
console.log(LogoutToken, "LogoutToken")
const Token_verify = (req, res, next) => {
    const signature = process.env.TOKEN_SIGNATURE

    try {
        // if (!req.session.user) {
        //     const err = {
        //         statusCode: 401,
        //         message: "login first user not exist in session",
        //     }
        //     return next(err)
        // }
        let header_token = req.headers['x-access-token'] || req.headers['authorization'];
        let token = header_token.replace(/^bearer\s+/, "");
        if (!header_token) {
            const err = {
                staus: false,
                statusCode: 401,
                message: "user not Authorized"
            }
            return next(err)
        }
        jwt.verify(token, signature, (err, decoded) => {
            if (err) {
                return next(err)
            }
            req.decoded = decoded;
            next()
        })

    } catch (error) {
        next(error)
    }

}
export default Token_verify

