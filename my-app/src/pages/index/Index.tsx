import { useEffect, useState } from "react";
import "./index.css";
import Modal from "react-modal";
import toast, { Toaster } from 'react-hot-toast';
import Axios from "../../interceptor/axiosInterceptor";
import AllPost from "../../components/allpost/AllPost";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate()
  useEffect(()=> {
      const token = localStorage.getItem('token')
      if(!token){
        navigate('/login')
      }
  },[])
  const [allPost,setAllPost] = useState<any>(null)
  const getAllPost = async () => {
    try {
      const {data} = await Axios.get('/post/allpost')
      setAllPost(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    getAllPost()
  },[])
  const [modal, setModal] = useState(false);
  const [value,setValue] = useState({
    title:'',
    description:''
  })
  const newPost = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const postSubmit = async () => {
    try {
      const {data} = await Axios.post('/post/newPost',value)
      toast.success(data.message)
      setModal(false)
      getAllPost()
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
    }
  }
  const inputChange = (e:any) => {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }
  const customStyles = {
    content: {
      width: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const {title,description} = value;
  return (
    <>
                <Modal
              isOpen={modal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div id="modal">
                <h4>Add post</h4>
                <div className="input_field">
                  <input type="text" name="title" placeholder="Enter title" value={title} onChange={inputChange} />
                </div>
                <div className="input_field">
                  <textarea
                    name="description"
                    placeholder="Enter description"
                    onChange={inputChange}
                    value={description}
                  ></textarea>
                </div>
                <div className="buttons">
                  <button onClick={closeModal}>close</button>
                  <button onClick={postSubmit} >submit</button>
                </div>
              </div>
            </Modal>
      <main>
        <div className="main_container">
          <div className="main_wrapper">
            <header onClick={newPost}>
              <div className="new_post">
                <i className="bx bx-plus-circle"></i>
                <span>Create new post</span>
              </div>
            </header>
           <div className="allpost">
           {
              allPost && allPost.map((elem:any,i:number)=> {
            return ( <AllPost title={elem.title} description={elem.description} id={elem.id} key={i}  getAllPost={getAllPost} />)
              })
            }
           </div>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default Index;
