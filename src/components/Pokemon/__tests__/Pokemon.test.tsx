import { render, screen } from "@testing-library/react";
import Pokemon from "../Pokemon";

const mockItem = {
  name: "pokemonName",
  sprites: {
    front_default: "https://placehold.co/100x100",
  },
  types: [{ type: { name: "type-1" } }, { type: { name: "type-2" } }],
};

describe("Pokemon", () => {
  test("should render component", () => {
    render(<Pokemon item={mockItem} />);
    expect(screen.getByTestId("pokemon")).toBeInTheDocument();
  });
  test("should render name", () => {
    render(<Pokemon item={mockItem} />);
    expect(screen.getByText("pokemonName")).toBeInTheDocument();
  });
  test("should render types", () => {
    render(<Pokemon item={mockItem} />);

    const types = screen.getAllByTestId("type");
    expect(types).toHaveLength(2);
  });
});
