import { useQuery ,useMutation} from "react-query";

async function fetchComments(postId) {

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  
  // replace with useQuery
  const {data,isLoading} = useQuery(['detail', post.id],()=>fetchComments(post.id),{
    staleTime:1000*5
  })
  const updateMutationPost = useMutation((text)=>updatePost(text))
  if(isLoading) return <div>isLoading...</div>
  
  
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button >Delete</button> 
      <button onClick={()=>updateMutationPost.mutate(post.id)}>Update title</button>
      {updateMutationPost.isSuccess && <p style={{color:'green'}}>성공</p>}
      {updateMutationPost.isLoading && <p style={{color:'pupple'}}>로딩중</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
