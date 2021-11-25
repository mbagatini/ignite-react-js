import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: string) {
  return format(date ? new Date(date) : new Date(), 'dd MMM yyyy', {
    locale: ptBR,
  });
}
