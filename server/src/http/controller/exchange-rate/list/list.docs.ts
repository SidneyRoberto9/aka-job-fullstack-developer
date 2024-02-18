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
        page: { type: 'integer', description: 'Page number for pagination', default: 1 },
        to: { type: 'string', format: 'date', description: 'Date for filtering quotations' },
        from: { type: 'string', format: 'date', description: 'Date for filtering quotations' },
      },
    },
  },
};
