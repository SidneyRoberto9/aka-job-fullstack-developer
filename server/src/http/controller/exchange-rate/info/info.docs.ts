export const infoDocs = {
  schema: {
    security: [{ bearerAuth: [] }],
    description:
      'The info endpoint provides the daily average, highest, and lowest values for the dollar to real conversion rate.',
    tags: ['Exchange Rate'],
    summary: 'Get Exchange Rate Info',
    params: {
      type: 'object',
      properties: {
        currency: { type: 'string', default: 'USD' },
      },
    },
  },
};
