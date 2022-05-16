import { Grid, Heading } from "@chakra-ui/react";

import { City } from "./City";

const cities = [
  {
    name: 'Londres',
    image: 'london.png',
    country: {
      name: 'Reino Unido',
      flagImage: 'uk-flag.png',
    }
  },
  {
    name: 'Paris',
    image: 'paris.png',
    country: {
      name: 'França',
      flagImage: 'france-flag.png',
    }
  },
  {
    name: 'Roma',
    image: 'rome.png',
    country: {
      name: 'Itália',
      flagImage: 'italy-flag.jpg',
    }
  },
  {
    name: 'Praga',
    image: 'prague.png',
    country: {
      name: 'República Tcheca',
      flagImage: 'czech-flag.jpg',
    }
  },
  {
    name: 'Amsterdã',
    image: 'amsterdam.png',
    country: {
      name: 'Holanda',
      flagImage: 'netherlands-flag.png',
    }
  },
]

export function Cities() {
  return (
    <>
      <Heading fontWeight="500" fontSize={["2xl", "4xl"]} mb="10">
        Cidades +100
      </Heading>
      <Grid
        templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gap={["20px", "45px"]}
        alignItems="center"
        justifyContent="center"
        px={["30px", "0"]}
      >
        {cities.map(city => (
          <City city={city} />
        ))}
      </Grid>
    </>
  )
}