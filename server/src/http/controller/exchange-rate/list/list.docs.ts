export const listDocs = {
  schema: {
    security: [{ bearerAuth: [] }],
    description:
      'The list endpoint retrieves a paginated list of dollar quotations, with optional filters for page number and date to customize the data retrieval.',
    tags: ['Exchange Rate'],
    summary: 'List Exchange Rate Data',
    body: {
      type: 'object',
      properties: {
        currency: { type: 'string', description: 'Currency to filter quotations', default: 'USD' },
        page: { type: 'integer', description: 'Page number for pagination', default: 1 },
      },
    },
  },
};
