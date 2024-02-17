export const registerDocs = {
  schema: {
    description:
      'The register endpoint creates a new user account using the provided name, email, and password, enabling access to personalized features.',
    tags: ['Authentication'],
    summary: 'Sign Up User',
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  },
};
