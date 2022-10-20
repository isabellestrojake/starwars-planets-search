import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockData from "../../cypress/mocks/testData";
import App from "../App";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

describe("Star Wars Search Planets", () => {
  it("1", async () => {
    render(<App />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const selectColumn = screen.getByTestId('column-sort');
    const radioAsc = screen.getByLabelText('ASC')
    const radioDesc = screen.getByLabelText('DESC')
    const columnSortButton = screen.getByTestId('column-sort-button')

    userEvent.selectOptions(selectColumn, "rotation_period");
    userEvent.click(radioAsc);
    userEvent.click(columnSortButton);
    userEvent.click(radioDesc);
    userEvent.click(columnSortButton);

  });

  it("2", async () => {
    render(<App />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const inputName = screen.getByTestId("name-filter");

    userEvent.type(inputName, "oo");

    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("3", async () => {
    render(<App />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const selectValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.click(buttonFilter)
    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(selectValue,'200');
    userEvent.click(buttonFilter)
    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(selectValue,'100');
    userEvent.click(buttonFilter)
  });

  it("4", async () => {
    render(<App />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const selectColumn = screen.getByTestId("column-filter");
    const selectComparison = screen.getByTestId("comparison-filter");
    const selectValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    const removeAllFilter = screen.getByTestId('button-remove-filters')
    
    userEvent.click(buttonFilter)
    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(selectValue,'200');
    userEvent.click(buttonFilter)
    userEvent.click(screen.getAllByRole('button', {
      name: /x/i
    })[0])
    userEvent.click(removeAllFilter)  
  });
});