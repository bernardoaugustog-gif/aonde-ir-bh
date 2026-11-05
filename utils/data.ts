export function formatarDataBR(data: string) {
  const partes = data.split('-');
  if (partes.length === 3 && partes[0].length === 4) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  return data;
}