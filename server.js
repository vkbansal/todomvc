var Express = require("express"),
    app = new Express();

// app.get("/", function(req, res) {
//     res.redirect("/index.html");
// });

app.use(Express.static(__dirname));

console.log("Starting server at http://localhost:8000");
app.listen(8000, 'localhost');