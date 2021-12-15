const express = require('express');
const http =require('http');
const path = require('path');
const socket = require('socket.io');

const cheerio = require('cheerio');
const request = require('request');
const { getData } = require('./corona');

const app = express();
//서버에 들어갈 요청에 대한 응답 함수를 만들어준다.
const server= http.createServer(app);
// 서버 만들기

const io = socket(server);

app.set('port',80);
app.set('views', path.join(__dirname ,'views'));  //html따로 뺄 공간을 views 폴더에 할거임
app.set('view engine', 'ejs'); //ejs 뷰의 기본 엔진으로 설정한다. 

app.get('/', (req, resp)=> {
    let name = "양영디지털";
    if(req.query.name !==undefined) {
        name = req.query.name;
    }
    resp.render('main',{name});
})

app.get('/corona', async (req, resp)=> {
    let data = await getData();

    resp.render("corona", {...data});
})


server.listen(app.get('port'),()=> {
    console.log(`서버가 ${app.get('port')} 포트에서 실행중입니다.`);
})