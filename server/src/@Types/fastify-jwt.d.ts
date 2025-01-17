import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {};
    user: {
      sign: {
        sub: string;
      };
    };
  }
}
