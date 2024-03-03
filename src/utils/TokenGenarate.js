import jwt from 'jsonwebtoken'

const TokenGenrate = async (details, req, res) => {
    const Signature = process.env.TOKEN_SIGNATURE
    const Token = await jwt.sign({ id: details._id, email: details.email, name: details.name }, Signature, { expiresIn: '2d' })
    if (!Token) {
        return res.send({ status: false, message: "Token not genrated" })
    }
    return Token
}
export default TokenGenrate