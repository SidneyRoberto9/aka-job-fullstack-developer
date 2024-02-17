export const sessionDocs = {
  schema: {
    description:
      'The session endpoint authenticates users by validating their email and password, then returns an access token for securing subsequent requests.',
    tags: ['Authentication'],
    summary: 'Sign In User',
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  },
};
