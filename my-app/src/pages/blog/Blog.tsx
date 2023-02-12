import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Axios from "../../interceptor/axiosInterceptor"
import './blog.css'
const Blog = () => {
  const [post,setPost] = useState<any>(null)
  const {id} = useParams()
  const getSinglePost = async () => {
    const {data} = await Axios.get(`/post/getsingle/${id}`)
    setPost(data)
  }
  useEffect(()=> {
    getSinglePost()
  },[])
  return (
    <>
    <section className="blog">
      <div className="blog_container">
        <h1> {post?.title} </h1>
        <h4>Author : {post?.user?.username}</h4>
        <p> {post?.description} </p>
      </div>
    </section>
    </>
  )
}

export default Blog