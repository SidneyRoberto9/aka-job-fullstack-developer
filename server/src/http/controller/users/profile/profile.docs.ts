export const profileDocs = {
  schema: {
    security: [{ bearerAuth: [] }],
    description:
      'The profile endpoint retrieves all data of the authenticated user, using a valid access token, to personalize their experience and manage their account.',
    tags: ['User'],
    summary: 'Get User Data',
  },
};
