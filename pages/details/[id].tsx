import React from "react";
import { useRouter } from "next/router";
import {
  getAll,
  getById,
  getRunningQueriesThunk,
  useGetByIdQuery,
} from "../../src/state/query";
import { wrapper } from "src/state/store";
import Details from "src/components/Details";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: details, isFetching } = useGetByIdQuery(id || "", {
    skip: !id,
  });

  const closeDetailsSection = () => {
    router.push("/");
  };

  return (
    <Details
      details={details}
      closeDetailsSection={closeDetailsSection}
      isFetching={isFetching}
    />
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === "string") {
      store.dispatch(
        getAll.initiate({
          searchTerm: "",
          page: 1,
          limit: 10,
        }),
      );
      store.dispatch(getById.initiate(id));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);
