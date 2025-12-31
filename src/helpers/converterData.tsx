export function formatDateBrazil(dataISO: string | undefined | null): string {
  if (!dataISO) {
    return "Sem data";
  }
  const data = new Date(dataISO);

  // Extrai dia, mês e ano
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
