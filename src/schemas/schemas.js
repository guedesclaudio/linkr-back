import joi from "joi";

const newPostSchema = joi.object({
    post_url: joi.string().required(),
    body: joi.string().allow('')
});

const editPostSchema = joi.object({
    body: joi.string().allow('')
});

const newCommentSchema = joi.object({
    comment: joi.string().required()
});

function verifyNewPostSchema (req, res, next) {
    const validation = newPostSchema.validate(req.body, {abortEarly: false});
    const isValidUrl = urlString => {
        const urlPattern = new RegExp('^(https?:\\/\\/)'+ // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
            '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    if (validation.error) {
        const errors = validation.error.details.map(details => details.message);
        return res.status(422).send(errors);
    }

    isValidUrl(req.body.post_url);

    if (!isValidUrl(req.body.post_url)) {
        return res.status(422).send("post_url has an invalid URL");
    }

    return next();
}

function verifyEditPostSchema (req, res, next) {
    const validation = editPostSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(details => details.message);
        return res.status(422).send(errors);
    }
    return next();
}

function verifyNewCommentSchema (req, res, next) {
    const validation = newCommentSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(details => details.message);
        return res.status(422).send(errors);
    }
    return next();
}

export { verifyNewPostSchema, verifyEditPostSchema, verifyNewCommentSchema };