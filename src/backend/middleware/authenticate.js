const authenticate = function(protectedPaths) {
    return function(req, res, next) {
        let isProtectedRoute = false;
        const formatterPath = req.path.substring(1, req.path.length);
        console.info(formatterPath);

        if (protectedPaths.includes(formatterPath)) {
            isProtectedRoute = true;
        }
        if (isProtectedRoute) {
            /*
                if (isValidCookie(req.cookie)) {
                    next()
                    return;
                }
                res.status(403).redirect('/login.html');
            */
            //TODO add auth
            console.warn("no authentication done");
            next();
        } else {
            next();
        }
    };
};

const isValidCookie = function(cookies) {
    return false;
};

module.exports = authenticate;