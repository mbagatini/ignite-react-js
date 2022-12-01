import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: string, dateFormat: string) {
  return format(date ? new Date(date) : new Date(), dateFormat, {
    locale: ptBR,
  });
}
