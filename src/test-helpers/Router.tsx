import { MemoryRouter } from "react-router-dom";

export function wrapWithRouter(component: JSX.Element) {
  return <MemoryRouter>{component}</MemoryRouter>;
}
