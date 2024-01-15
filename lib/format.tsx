export function formatPrice(price: number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(price);
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 9 ? `0${day}` : day}/${
    month < 9 ? `0${month}` : month
  }/${year}`;
};
