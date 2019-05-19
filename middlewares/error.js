module.exports = function() {

    var errors = {};

    errors.err = {
        errors: []
    };

    console.log("errors : "+errors.err.errors);

    errors.sendErrors = function(res, code) {
        res.status(code).render("error", {
            code: code,
            message: errors.err.errors[0].message
        });
    }

    errors.addMessage = function(code, message) {
        errors.err.errors.push({
            code: code,
            message: message
        });
    }

    errors.defined = function() {
        return (errors.err.errors.length > 0);
    }

    return errors;
}