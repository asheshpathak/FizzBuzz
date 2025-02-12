import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("App Component", () => {
  test("renders heading and descriptive text", () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );

    expect(
      screen.getByRole("heading", { name: /calculate the fizzbuzz/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /its fizz, buzz, fizzbuzz or maybe invalid, check here!/i
      )
    ).toBeInTheDocument();
  });

  test("integrates input and table components", async () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );

    // Find the input field and type a valid comma-separated value
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "3, 5");

    // Click the Calculate button in the InputComponent
    const calculateButton = screen.getByRole("button", { name: /calculate/i });
    expect(calculateButton).toBeEnabled();
    await userEvent.click(calculateButton);

    // Wait for the TableComponent to update its results
    await waitFor(() => {
      expect(screen.getByText(/results/i)).toBeInTheDocument();
    });

    // Verify that the table shows the calculated results.
    // For 3: divisible by 3 (but not 5) should yield "Fizz"
    // For 5: divisible by 5 (but not 3) should yield "Buzz"
    expect(screen.getByText("Fizz")).toBeInTheDocument();
    expect(screen.getByText("Buzz")).toBeInTheDocument();

    // Click the Recalculate button and verify that the table resets.
    const recalcButton = screen.getByRole("button", {
      name: /recalculate/i,
    });
    await userEvent.click(recalcButton);

    expect(
      screen.getByText(/there's nothing here! start calculating\./i)
    ).toBeInTheDocument();
  });
});
