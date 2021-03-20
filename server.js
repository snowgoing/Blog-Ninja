const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    
    let path = './views/'
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default: 
            path += '404.html';
            res.statusCode = 404;

    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end()
        }
        res.end(data);
    })

});

server.listen(port, 'localhost', () => {
    console.log('Listening at localhost:3000')
});