const router = require('express').Router();
const passport = require('passport')

router.use('/', require('./cars'));
router.use('/', require('./students'));

router.get('/login', passport.authenticate('github'), (req, res, next) => {
    res.redirect('/api-docs');
})
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
})

module.exports = router;