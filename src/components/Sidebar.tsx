import { SyntheticEvent, useContext, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorButton from "./ErrorButton";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Paths } from "./Router.types";
import { SidebarContext } from "./SidebarContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const { isLoading } = useContext(SidebarContext);

  const navigateToHome = (e: SyntheticEvent) => {
    if (e.target === sidebarRef.current) {
      navigate(Paths.Home);
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-1/3 h-full cursor-pointer"
        ref={sidebarRef}
        onClick={(e) => {
          navigateToHome(e);
        }}
      >
        <ErrorButton />
        <SearchBar />
        {isLoading ? (
          <div className="flex justify-center items-center animate-pulse">
            Loading...
          </div>
        ) : (
          <SearchResults />
        )}
      </div>
      <div className="flex justify-center items-center w-2/3">
        <Outlet />
      </div>
    </>
  );
}
