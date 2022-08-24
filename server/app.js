const express = require('express');
const app = express();

app.use(require('cors')());  // cors跨域
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./'));
require('./dao/db')(app);
require('./routes/restRoute')(app)
require('./routes/webRoute')(app)
require('./routes/adminRoute')(app)


app.listen(3000, () => {
    console.log("vdocs2 server is listen http://localhost:3000/")
})