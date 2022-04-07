import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import fs from 'fs'

let rawData = fs.readFileSync('./jwks.json')
let jwk = JSON.parse(rawData)
let  pem = jwkToPem(jwk.keys[0]);

let authJwt = (req) => {
    const { accessToken } = req.cookies;
    if (accessToken) {
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
            if(!err) {
                req.userID = decodedToken.sub;
            }
        });
    }
}

export default authJwt