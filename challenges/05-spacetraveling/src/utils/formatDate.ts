import format from "date-fns/format";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string, type = "date") {
  if (type == "date") {
    return format(
      new Date(date),
      "PP",
      {
        locale: ptBR,
      }
    )
  } else {
    return format(
      new Date(date),
      "PP 'às' HH:mm",
      {
        locale: ptBR,
      }
    )
  }
}

export function formatDateTime(date: string) {
  return format(
    new Date(date),
    "PP",
    {
      locale: ptBR,
    }
  )
}