import { Flex, Grid, Icon, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiArrowLeftSLine } from "react-icons/ri";

export function Header() {
  const { asPath } = useRouter()
  const homePage = asPath === "/"

  return (
    <Flex
      bg="white"
      w="100%"
      as="header"
      h={100}
      mx="auto"
      px="1rem"
      height={["50px", "100px"]}
      align="center"
      justify="center"
    >
      <Grid
        h="100%"
        w="100%"
        mx="auto"
        maxW="1160px"
        alignItems="center"
        templateColumns="repeat(3, 1fr)"
        justifyContent="center"
      >
        {!homePage && (
          <Link href="/">
            <a>
              <Icon as={RiArrowLeftSLine} fontSize={[20, 40]} justifySelf="start" />
            </a>
          </Link>
        )}

        <Image
          w={["81px", "184px"]}
          src="/images/logo.svg"
          alt="World Trip Logo"
          justifySelf="center"
          gridColumn="2"
        />
      </Grid>
    </Flex>
  )
}