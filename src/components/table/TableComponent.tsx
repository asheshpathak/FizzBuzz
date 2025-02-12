import {
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Wrap,
  WrapItem,
  Box,
  Kbd,
  Image,
  Code,
  Divider,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import graphic from "../../assets/3047124.jpg";

interface Props {
  data: (string | number)[];
  clearOnRecalculate: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

interface Data {
  input: string;
  result: string;
}

export const TableComponent: React.FC<Props> = ({
  data,
  clearOnRecalculate,
}) => {
  const [dataSet, setDataSet] = useState<Data[]>([]);

  const calculateFizzBuzz = () => {
    // Create a new array to accumulate your results
    const newData: Data[] = [];

    data.forEach((element: string | number) => {
      if (typeof element === "string") {
        newData.push({ input: "<empty>", result: "Invalid Item" });
      } else if (element % 3 === 0 && element % 5 === 0) {
        newData.push({ input: `${element}`, result: "FizzBuzz" });
      } else if (element % 3 === 0 && element % 5 !== 0) {
        newData.push({ input: `${element}`, result: "Fizz" });
      } else if (element % 5 === 0 && element % 3 !== 0) {
        newData.push({ input: `${element}`, result: "Buzz" });
      } else {
        newData.push({
          input: `${element}`,
          result: `Divided ${element} by 3 \nDivided ${element} by 5`,
        });
      }
    });

    // Now update the state once
    setDataSet(newData);
    console.log(newData); // This will log the complete new data set
  };

  const clearDataForRecalculation = () => {
    clearOnRecalculate([]);
  };

  useEffect(() => {
    calculateFizzBuzz();
  }, [data]);
  if (data.length === 0)
    return (
      <>
        <Wrap justify="center" align="center" p={6}>
          <WrapItem>
            <Box w="500px" p={6} alignItems="center">
              <Wrap justify="center" p={2}>
                <Heading as="h5" size="sm">
                  There's Nothing here! start calculating.
                </Heading>
              </Wrap>
              <Image src={graphic} />
            </Box>
          </WrapItem>
          <Center height="50px">
            <Divider orientation="vertical" height="300px" />
          </Center>
          <WrapItem>
            <Box w="500px" p={6} alignItems="center">
              <Heading as="h5" size="sm" pt={6} pb={6}>
                How its done?
              </Heading>
              <Kbd>pseudocode:</Kbd>
              <Code mt={2} mb={2}>
                1. If the value is both divisible by 3 and 5, the result is
                FizzBuzz
              </Code>
              <Code mt={2} mb={2}>
                2. If the value is just divisible by 3 but not 5, the result is
                Fizz
              </Code>
              <Code mt={2} mb={2}>
                3. If the value is just divisible by 5 but not 3, the result is
                Buzz
              </Code>
              <Code mt={2} mb={2}>
                4. If the value is not divisible by either 3 and 5, the result
                is : Divided "number" by 3 , Divided "number" by 5
              </Code>
              <Kbd>pass the comma seperated values in the input above.</Kbd>
              <br></br>
              <Kbd>example : 1,2,3,a,b,15,xyz,30</Kbd>
            </Box>
          </WrapItem>
        </Wrap>
      </>
    );
  return (
    <>
      <Box p={6}>
        <Wrap justify="space-between">
          <WrapItem>
            <Heading size="lg" as="h3">
              Results
            </Heading>
          </WrapItem>
          <WrapItem>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={clearDataForRecalculation}
            >
              Recalculate
            </Button>
          </WrapItem>
        </Wrap>
        <Box display="flex" justifyContent="center">
          <TableContainer
            w="50%"
            border="1px solid black"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Table variant="striped">
              <TableCaption>
                The above are results calculated for each element of the array
                passed to the input
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Input</Th>
                  <Th>Result</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataSet.map((item) => {
                  return (
                    <>
                      <Tr>
                        <Td>
                          <Kbd>{item.input}</Kbd>
                        </Td>
                        <Td style={{ whiteSpace: "pre-line" }}>
                          {item.result}
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};
