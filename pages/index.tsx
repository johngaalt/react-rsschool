import Image from "next/image";
import { getAll, getRunningQueriesThunk } from "src/state/query";
import { wrapper } from "src/state/store";

export default function Home() {
  return (
    <>
      <div className="w-full h-full">
        <Image
          src="/logo.svg"
          width={1024}
          height={500}
          alt="star wars"
          className=" object-cover"
        />
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
