import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery(
      "sp-page",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
      }
    );
  if (isLoading) return <div>기다로랴~</div>;
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
    {isFetching && <div>기다료라</div>}
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => {
          return (
            <Species
              key={person.name}
              name={person.name}
              language={person.language}
              averageLifespan={person.average_lifespan}
            />
          );
        });
      })}
    </InfiniteScroll>
    </>
  );
}
