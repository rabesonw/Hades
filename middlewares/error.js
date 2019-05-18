exports.errors = function() {
    err = {
        errors: []
    };

    sendErrors = function(res, code) {
        res.status(code).json(err);
    }

    addMessage = function(code, message) {
        err.errors.push({
            code: code,
            message: message
        });
    }

    defined = function() {
        return (err.errors.length > 0);
    }
}