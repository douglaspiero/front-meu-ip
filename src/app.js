const express = require('express');
const app = express();
const axios = require('axios');
const {engine} = require('express-handlebars');
const requestIp = require('request-ip');


//Config Files Statics
app.use(express.static('src/public'));

//Config Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Routes
app.get('/', async(req,res) => {
    var clientIp = requestIp.getClientIp(req); 
    console.log(clientIp);
    
    const dados = await axios.get(`http://ip-api.com/json/${clientIp}`)
    const status = dados.data.status;
    const ip = dados.data.query;
    const country = dados.data.country;
    const city = dados.data.city;
    const region = dados.data.region;
    const countryCode = dados.data.countryCode;
    const isp = dados.data.isp;        
    res.render('home', {status, ip, country, countryCode, city, region, isp});
});

app.listen(process.env.PORT || 3000, () => {
    try {
        console.log("Server is Running ");
    } catch (error) {
        console.log("Server Error: ", error);
    }
})



