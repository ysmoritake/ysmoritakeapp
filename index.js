var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');
var template = fs.readFileSync('./template.ejs', 'utf8');
var content1 = fs.readFileSync('./content1.ejs', 'utf8');
var content2 = fs.readFileSync('./content2.ejs', 'utf8');

var routes = {
    "/": {
        "title": "Main Page",
        "message": "sampledesuyo",
        "content": content1
    },
    "/index": {
        "title": "Main Page",
        "message": "korehasaple",
        "content": content1
    },
    "/other": {
        "title": "betsunopege",
        "content": content2
    }
};

var server = http.createServer();
server.on('request', doRequest);
server.Listen(1234);
console.log('Server running!');

function doRequest(request, response) {
    var url_parts = url.parse(request.url);

    if (routes[url_parts.pathname] == null) {
        console.log("NOT FOUND PAGE:" + request.url); response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end("<html><body><h1>NOT FOUNDE PAGE" + 
        request.url + "</h1></body></html>");
        return;
    }
    var content = ejs.render(template,{
        title:routes[url_parts.pathname].title, content:ejs.render(routes[url_parts.pathname].content, {
            mesage: routes[url_parts.pathname].message
        })
    }
);
response.writeHead(200, {
    'Content-Type': 'text/html'
});
response.write(content);
response.end();

}