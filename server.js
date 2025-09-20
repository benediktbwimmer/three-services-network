const http = require('node:http');

const port = Number(process.env.PORT ?? 3000);

const routes = new Map([
  [
    '/healthz',
    () => ({
      status: 'ok',
      network: 'three-service-network'
    })
  ],
  [
    '/',
    () => ({
      message: 'Three Service Network placeholder',
      services: ['better-fileexplorer', 'ai-connector', 'tagging-service']
    })
  ]
]);

const server = http.createServer((req, res) => {
  const handler = routes.get(req?.url ?? '') ?? routes.get('/') ?? (() => ({}));
  const payload = handler();
  const body = JSON.stringify(payload);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
});

server.listen(port, () => {
  console.log(`three-service-network placeholder listening on port ${port}`);
});
