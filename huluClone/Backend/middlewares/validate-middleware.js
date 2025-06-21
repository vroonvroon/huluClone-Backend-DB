const validate = (schema) => async(req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = err.errors[0].message;

        const errors =  {
            status,
            message,
        }
        console.log(errors);
        // res.status(400).json({msg: err});
        next(errors);
    }
};

module.exports = validate;

