import { render, screen } from "@testing-library/react";
import { DynamicTable } from "../DynamicTable";


describe("DynamicTable Tests", () => {
    it("should render the table with no data", () => {
        const data: [] = [];
        // Render the component and check if it renders with no data:
        render(<DynamicTable data={data} />);
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("should render the table with data", () => {
        //
        const data = [
            {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "123-456-6789",
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phone: "123-456-2344", 
            }
        ];
        render(<DynamicTable data={data} />);
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    });
});