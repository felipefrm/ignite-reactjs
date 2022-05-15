import { Grid, GridItem } from "@chakra-ui/react";

import Bullet from "./Bullet";

export function BulletPoints() {
  return (
    <Grid
      templateColumns={["1fr 1fr", "1fr 1fr", "1fr 1fr", "repeat(5, 1fr)"]}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      mt={["10", "32"]}
      mx="auto"
      maxW="1160px"
      gap={[1, 5]}
    >
      <GridItem>
        <Bullet icon="cocktail" text="vida noturna" />
      </GridItem>
      <GridItem>
        <Bullet icon="beach" text="praia" />
      </GridItem>
      <GridItem>
        <Bullet icon="building" text="moderno" />
      </GridItem>
      <GridItem>
        <Bullet icon="classic" text="clássico" />
      </GridItem>
      <GridItem colSpan={[2, 2, 2, 1]}>
        <Bullet icon="earth" text="e mais..." />
      </GridItem>
    </Grid>
  )
}