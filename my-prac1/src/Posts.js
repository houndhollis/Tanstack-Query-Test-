import { useQuery } from "@tanstack/react-query"

const fetchPosts = async() => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  return res.json()
}
const Posts = () => {
 
  const {data , isLoading } = useQuery(['posts'],fetchPosts,{
    staleTime: 10000,
  })
  if(isLoading) return <div>로딩중</div>


  console.log(data)


  return (
    <div>Posts</div>
  )
}

export default Posts