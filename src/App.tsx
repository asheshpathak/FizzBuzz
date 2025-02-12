import { Divider, Heading, Text, Box } from "@chakra-ui/react";
import "./App.css";
import { InputComponent } from "./components/input/InputComponent";
import { TableComponent } from "./components/table/TableComponent";
import { useState } from "react";

function App() {
  const [dataSet, setDataSet] = useState<(string | number)[]>([]);
  return (
    <>
      <Box p={6} backgroundColor="gray.100">
        <Heading>Calculate the FizzBuzz</Heading>
        <Text mt={2} p={2}>
          Its Fizz, Buzz, FizzBuzz or maybe Invalid, check here!
        </Text>
      </Box>
      <InputComponent setDataSet={setDataSet} />
      <Divider />
      <TableComponent data={dataSet} clearOnRecalculate={setDataSet} />
    </>
  );
}

export default App;
