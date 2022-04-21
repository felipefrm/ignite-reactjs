import format from "date-fns/format";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  return format(
    new Date(date),
    "PP",
    {
      locale: ptBR,
    }
  )
}