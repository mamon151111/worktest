module.exports = function(app) {
    app.get('/ping/:id', function (req, res) {
        res.send('pong');
    });
    app.get('/pong', function (req, res) {
        res.send('ping');
    });
};