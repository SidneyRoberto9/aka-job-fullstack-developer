interface ILocaleDate {
  hour: number;
  iso: string;
}

export function convertActualDateToLocale(): ILocaleDate {
  const actualDate = new Date();

  let localeDate = actualDate.toLocaleDateString('pt-BR', { timeZone: 'America/Fortaleza' });

  let localeTime = actualDate.toLocaleTimeString('pt-BR', { timeZone: 'America/Fortaleza' });

  localeDate = localeDate.split('/').reverse().join('-');

  return {
    hour: Number(localeTime.split(':')[0]),
    iso: `${localeDate}T${localeTime}.000Z`,
  };
}
