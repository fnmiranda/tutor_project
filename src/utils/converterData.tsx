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

export function parseDate(data: Date | undefined): string {
  if(!data) return "";

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}

export function parseTime(data: Date | undefined): string {
  if  (!data) return "";

  const hora = String(data.getHours())
  const minuto = String(data.getMinutes())

  return `${hora}:${minuto}`;
}

export function formatTimeDifference(createdAt: Date): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now.getTime() - createdDate.getTime();
  
  // Converter para diferentes unidades
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  // Regras de formatação
  if (diffInSeconds < 60) {
    return 'Agora mesmo';
  } else if (diffInMinutes < 60) {
    return `há ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  } else if (diffInHours < 24) {
    return `há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  } else if (diffInDays < 7) {
    return `há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  } else {
    // Mais de 7 dias, mostrar data completa
    return createdDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

export function converterParaDataCompleta(dateStr: string, timeStr: string): Date {
  const [time, period] = timeStr.split(' '); // ["02:30", "PM"]
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');
  const isoString = `${dateStr}T${pad(hours)}:${pad(minutes)}:00`;

  return new Date(isoString);
}