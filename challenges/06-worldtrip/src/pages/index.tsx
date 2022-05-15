import { Flex, Heading } from "@chakra-ui/react";
import { Banner } from "../components/Banner";
import { BulletPoints } from "../components/BulletPoints";
import { Divider } from "../components/Divider";

import { Header } from "../components/Header"

const Home = () => {
  return (
    <Flex direction="column">
      <Header />
      <Banner />
      <BulletPoints />
      <Divider />

      <Heading
        textAlign="center"
        fontWeight="500"
        mb={["5", "14"]}
        fontSize={["lg", "3xl", "4xl"]}
      >
        Vamos nessa? <br />Então escolha seu continente
      </Heading>
    </Flex>
  )
}

export default Home
