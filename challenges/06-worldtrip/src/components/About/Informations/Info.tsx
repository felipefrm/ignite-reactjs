import { Flex, Heading, Icon, Text, Tooltip } from "@chakra-ui/react";
import { RiInformationLine } from "react-icons/ri";

interface InfoProps {
  value: number;
  label: string;
  tooltip?: string;
}

export function Info({ value, label, tooltip }: InfoProps) {
  return (
    <Flex
      direction="column"
      justify="center"
      align={["flex-start", "flex-start", "center"]}
    >
      <Heading fontSize={["2xl", "5xl"]} color="yellow.400" fontWeight="500">
        {value}
      </Heading>
      <Text fontSize={["md", "xl"]} color="gray.700" fontWeight="600">
        {label}

        {!!tooltip && (
          <Tooltip
            label="As cidades +100 são as cidades que o continente possui que estão entre as 100 cidades mais visitadas do mundo."
            fontSize="md"
          >
            <span>
              <Icon
                as={RiInformationLine}
                cursor="pointer"
                ml="1"
                color="gray.400"
                w={["10px", "16px"]}
                h={["10px", "16px"]}
              />
            </span>

          </Tooltip>
        )}
      </Text>
    </Flex>
  )
}