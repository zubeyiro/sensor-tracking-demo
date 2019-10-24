require('dotenv').config()
require('./data/index') // Import data
require('./lib/utils/response')
const auth = require('./lib/auth')
const app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').createServer(app);
global.io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", function (req, res, next) {
    res.send(global.response.success());
});

app.get("/db", function (req, res, next) {
    res.send(global.data);
});

app.get('/live', function (req, res, next) {
    res.sendFile(`${__dirname}/live.html`);
});

app.use("/auth", require("./routes/auth/index"));
app.use("/allocations", auth.userLogin, require("./routes/allocations/index"));
app.use("/sensors", auth.userLogin, require("./routes/sensors/index"));
app.use("/workouts", auth.userLogin, require("./routes/workouts/index"));

app.use(function (req, res, next) {
    res.status("404").send(global.response.error("Not Found"))
});
http.listen(process.env.PORT, function () {
    console.log(`-> Listening on port :${process.env.PORT}`)
});

module.exports = app