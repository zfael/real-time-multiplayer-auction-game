
/**
 * This function is a middleware that check if user is already connected.
 * @param {Object} req - http request 
 * @param {*} res - http response
 * @param {*} next - next middleware
 */
var login = function (req, res, next) {
    var loginRoute = '/login';
    var appRoute = '/';

    if (!req.cookies || !req.cookies.context) {
        if (req.originalUrl === loginRoute) {
            next();
        } else {
            res.redirect(loginRoute);
        }
    } else {
        if (req.originalUrl === loginRoute) {
            res.redirect(appRoute);
        } else {
            next();
        }
    }
};

module.exports = {
    login: login
};