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

export function parseStringForDate(dataHoraString: string): Date {
  // Remove espaços extras
  const stringLimpa = dataHoraString.trim();
  
  // Divide data e hora
  const [dataParte, horaParte] = stringLimpa.split('-').map(s => s.trim());
  
  if (!dataParte || !horaParte) {
    throw new Error('Formato inválido. Use "DD/MM/YYYY - HH:MM"');
  }
  
  // Parse da data
  const [diaStr, mesStr, anoStr] = dataParte.split('/').map(Number);
  
  // Parse da hora
  const [horaStr, minutoStr] = horaParte.split(':').map(Number);
  
  // Validações
  if (diaStr < 1 || diaStr > 31) throw new Error('Dia inválido');
  if (mesStr < 1 || mesStr > 12) throw new Error('Mês inválido');
  if (anoStr < 1000 || anoStr > 9999) throw new Error('Ano inválido');
  if (horaStr < 0 || horaStr > 23) throw new Error('Hora inválida (0-23)');
  if (minutoStr < 0 || minutoStr > 59) throw new Error('Minuto inválido (0-59)');
  
  // Cria a data com hora
  const data = new Date(anoStr, mesStr - 1, diaStr, horaStr, minutoStr);
  
  // Valida a data
  if (
    data.getDate() !== diaStr ||
    data.getMonth() !== mesStr - 1 ||
    data.getFullYear() !== anoStr ||
    data.getHours() !== horaStr ||
    data.getMinutes() !== minutoStr
  ) {
    throw new Error('Data/hora inválida');
  }
  
  return data;
}

export function parseDate(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}

