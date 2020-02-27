module.exports = {
    authorize: function(req) {
        return (
            req.session && 
            req.session.fastdelivery && 
            req.session.fastdelivery === true
        ) || (
            req.body &&
            req.body.username === this.username &&
            req.body.password === this.password
        );
    }
}