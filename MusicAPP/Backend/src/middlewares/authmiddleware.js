const jwt = require("jsonwebtoken");

function getToken(req) {
    return req.cookies?.Token;
}

async function authartist(req, res, next) {

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECREAT
        );

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "Only artists can perform this action"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}


async function authUser(req, res, next) {

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECREAT
        );

        if (decoded.role !== "user") {
            return res.status(403).json({
                message: "Only users can access this"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}


async function auth(req, res, next) {

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECREAT
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}


module.exports = {
    authartist,
    authUser,auth
};