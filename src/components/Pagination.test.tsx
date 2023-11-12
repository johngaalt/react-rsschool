import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Pagination from "./Pagination";
import { wrapWithRouter } from "../test-helpers/Router";
import { wrapWithSidebarContext } from "../test-helpers/SidebarContext";

function renderPagination() {
  const paginationWithContext = wrapWithSidebarContext(<Pagination />);
  const withRouter = wrapWithRouter(paginationWithContext);

  return render(withRouter);
}

describe("Pagination", () => {
  it.skip("should update url when page is changed to next page", async () => {
    renderPagination();
    const initialUrl = global.window.location.href;

    const nextButton = screen.getByText(/next page/i);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(global.window.location.href).not.toBe(initialUrl);
    });
  });
});
