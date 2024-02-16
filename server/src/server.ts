import { app } from '@/app';

const port = Number(process.env.PORT || 3000);

app
  .listen({
    host: '0.0.0.0',
    port: port,
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
