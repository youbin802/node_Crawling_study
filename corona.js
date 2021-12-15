const request = require('request');
const cheerio = require('cheerio');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";

function getData() {
    return new Promise((resolve, reject)=> {
        request.get(url,(err, res, body)=> {
            const $= cheerio.load(body);

            let a = "총 감염인원 :" + $("#content > div > div.caseTable > div:nth-child(1) > ul > li:nth-child(1) > dl > dd").eq(0).html(); 
            let b = "전일대비 총계 :" + $(".ca_value .inner_value").eq(0).html();
            let c = "국내발생 :" + $(".ca_value .inner_value").eq(1).html();
            let d = "해외발생 :" + $(".ca_value .inner_value").eq(2).html();

            resolve({a,b,c,d});
        });
    });
}

module.exports= {getData};
