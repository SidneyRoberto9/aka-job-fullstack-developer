export const listDocs = {
  schema: {
    security: [{ bearerAuth: [] }],
    description:
      'The list endpoint retrieves a paginated list of dollar quotations, with optional filters for page number and date to customize the data retrieval.',
    tags: ['Exchange Rate'],
    summary: 'List Exchange Rate Data',
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'integer', description: 'Page number for pagination' },
        date: { type: 'string', format: 'date', description: 'Date for filtering quotations' },
      },
    },
  },
};
