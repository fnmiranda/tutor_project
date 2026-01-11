export function formatDateBrazil(dataISO: string | undefined | null): string {
  if (!dataISO) {
    return "Sem data";
  }
  const data = new Date(dataISO);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); 
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function parseDate(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}