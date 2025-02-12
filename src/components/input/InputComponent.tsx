import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  FormHelperText,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

interface Props {
  setDataSet: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

export const InputComponent: React.FC<Props> = ({ setDataSet }) => {
  const [inputText, setInputText] = useState("");
  const [valid, setValid] = useState<boolean>(true);
  const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

  const captureInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern =
      "^(?:\\s*(?:\\d+|[A-Za-z]+)\\s*)(?:,\\s*(?:\\d+|[A-Za-z]+)\\s*)*$";
    const regex = new RegExp(pattern);
    const isValid = regex.test(e.target.value);

    setValid(isValid);
    if (isValid) {
      setInputText(e.target.value);
    }
    setEvent(e);
  };

  const clearInputAfterCapture = () => {
    if (event) event.target.value = "";
  };

  const parseInputValues = () => {
    const parsedInputString = inputText.split(",");
    const result = parsedInputString.map((item) => {
      // Check if the item is a string and can be converted to a number.
      if (typeof item === "string") {
        const num = Number(item);
        // If the conversion does not result in NaN, return the number.
        if (!isNaN(num)) {
          return num;
        }
      }
      return item;
    });
    // console.log(result);
    setDataSet(result);
    clearInputAfterCapture();
  };
  return (
    <>
      <Wrap justify="center" m={6}>
        <WrapItem>
          <FormControl>
            <Input
              width="400px"
              onChange={captureInputText}
              isInvalid={!valid}
            />
            {!valid ? (
              <FormHelperText color="red">
                Enter the values of the array in the comma separated form only
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </WrapItem>
        <WrapItem>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={parseInputValues}
            disabled={!valid}
          >
            Calculate
          </Button>
        </WrapItem>
      </Wrap>
    </>
  );
};
