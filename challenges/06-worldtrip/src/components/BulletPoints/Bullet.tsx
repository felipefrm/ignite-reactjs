import dynamic from "next/dynamic";
import { Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";

interface BulletPointProps {
  icon: string;
  text: string;
}

function Bullet({ icon, text }: BulletPointProps) {

  const isMobile = useBreakpointValue({
    base: false,
    sm: true
  })

  return (
    <Flex
      direction={["row", "column"]}
      align="center"
      justify="center"
    >
      {isMobile ? (
        <Image
          src={`/images/${icon}.png`}
          w="85px"
          h="85px"
          mb="6px"
        />
      ) : (
        <Text color="yellow.400" fontSize="4xl" mr="2">•</Text>
      )
      }
      <Text fontWeight="600" color="gray.700" fontSize={["md", "xl", "2xl"]}>
        {text}
      </Text>
    </Flex>
  )
}

export default dynamic(() => Promise.resolve(Bullet), {
  ssr: false
})