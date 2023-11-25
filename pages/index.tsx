import Image from "next/image";
import { getAll, getRunningQueriesThunk } from "src/state/query";
import { wrapper } from "src/state/store";
import image from "@/images/logo.svg";

export default function Home() {
  return (
    <>
      <div className="w-full h-full">
        <Image src={image} alt="star wars" className=" object-cover" />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getAll.initiate({ searchTerm: "", page: 1, limit: 10 }));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);
