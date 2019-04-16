import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQuery";

export default withRouter(({ location: { search } }) => {
  console.log(search )
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });

  console.log("data", data)

  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});