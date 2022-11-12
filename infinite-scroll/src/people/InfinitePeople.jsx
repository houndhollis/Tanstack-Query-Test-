import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // hasNextPage : 불린값으로 다음데이터가 있는지 확인
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // 처음에는 값이 없으니 url을 할당 해주면 된다.
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div>기다료라~</div>;
  if (isError) return <div>Error {error.toString()}</div>;
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <div>기다료라~</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
