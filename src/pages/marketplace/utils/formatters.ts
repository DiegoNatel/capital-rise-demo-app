
export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatNumber = (value: number, suffix: string = "") => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B${suffix}`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M${suffix}`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K${suffix}`;
  } else {
    return `${value.toFixed(2)}${suffix}`;
  }
};
