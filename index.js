import http from 'http'

function createServer () {
  return new Promise(resolve => {
    const server = http.createServer(function (request, response) {
      response.writeHead(200, {
        'content-type': 'text/html'
      });
      response.end(`
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Example Website</title>
        </head>
        <body>
          <header>My Example Website</header>
          <main>
            <p>Just some example content for my example website.</p>
            <button>Click Me!</button>
          </main>
        </body>
        </html>
      `);
    });

    server.on('listening',() => {
      resolve(server);
    });

    server.listen();
  });
}

export default createServer;
