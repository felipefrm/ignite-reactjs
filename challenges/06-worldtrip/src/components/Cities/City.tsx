import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface CityProps {
  city: {
    name: string;
    image: string;
    country: {
      name: string;
      flagImage: string;
    }
  }
}

export function City({ city }: CityProps) {
  return (
    <Box borderRadius="4px" overflow="hidden">
      <Image
        src={`/images/${city.image}`}
        alt={`Ponto turístico de ${city.name}`}
        h="170px"
        w="100%"
      />
      <Flex
        p="6"
        align="center"
        justify="space-between"
        bg="white"
        border="1px"
        borderColor="yellow.300"
        borderTop="0"
      >
        <Flex direction="column">
          <Heading fontSize="xl" fontWeight="500">{city.name}</Heading>
          <Text mt="3" fontSize="md" color="gray.500" fontWeight="500">
            {city.country.name}
          </Text>
        </Flex>
        <Image
          src={`/images/${city.country.flagImage}`}
          alt={`Bandeira do ${city.country.name}`}
          borderRadius="50%"
          objectFit="cover"
          w="30px"
          h="30px"
        />
      </Flex>
    </Box>
  )
}