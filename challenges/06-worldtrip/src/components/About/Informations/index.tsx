import { Flex } from "@chakra-ui/react";

import { Info } from "./Info";

export function Informations() {
  return (
    <Flex align="center" justify="space-between">
      <Info value={50} label="países" />
      <Info value={60} label="países" />
      <Info value={27} label="cidades +100" tooltip="As cidades +100 são as cidades que o continente possui que estão entre as 100 cidades mais visitadas do mundo." />
    </Flex>
  )
}