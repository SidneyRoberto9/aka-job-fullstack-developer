export const currentDayVariationDocs = {
  schema: {
    security: [{ bearerAuth: [] }],
    description:
      "The current-day-variation endpoint returns all variations of the day's dollar to real conversion rate.",
    tags: ['Exchange Rate'],
    summary: 'Get Exchange Rate Data Variation of the Current Day',
    params: {
      type: 'object',
      properties: {
        currency: { type: 'string', default: 'USD' },
      },
    },
  },
};
