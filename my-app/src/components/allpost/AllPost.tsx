import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../interceptor/axiosInterceptor";
import "./allPost.css";
import Modal from "react-modal";
import { toast, Toaster } from "react-hot-toast";
const AllPost = ({
  title,
  description,
  id,
  getAllPost,
}: {
  title: string;
  description: string;
  id: string;
  getAllPost: Function;
}) => {
    const [modal ,setModal] = useState<boolean>(false)
    const [value,setValue] = useState({
        Title:title,
        Description:description
    })
  const deletePost = async (id: string) => {
    try {
      const res = await Axios.delete(`post/deletePost/${id}`);
      if (res.status === 204) {
        getAllPost();
        toast.success('delete successfull')
      }
    } catch (error:any) {
        toast.error(error?.response?.data?.message)
    }
  };
  const updatePost = async (id:string) => {
    setModal(true)
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
  const inputChange = (e:any) => {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }
  const closeModal = () => {
    setModal(false);
  };
  const updatePostSubmit = async () => {
    try {
        const res = await Axios.patch(`post/updatePost/${id}`,value)
        if(res.status === 200) {
            toast.success(res?.data?.message)
            setModal(false)
            getAllPost()
        }
    } catch (error:any) {
        toast.error(error?.response?.data?.message)
    }
  }
  const {Title,Description} = value
  return (
    <>
      <div className="single">
        <Link to={`blog/${id}`}>
          <h2> {title}</h2>
          <p> {description.substring(0, 50)} </p>
        </Link>
        <div className="icons">
          <i className="bx bxs-edit" onClick={() => updatePost(id)}></i>
          <i className="bx bx-trash" onClick={() => deletePost(id)}></i>
        </div>
      </div>
      <Modal
              isOpen={modal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div id="modal">
                <h4>Add post</h4>
                <div className="input_field">
                  <input type="text" name="Title" placeholder="Enter title" value={Title} onChange={inputChange} />
                </div>
                <div className="input_field">
                  <textarea
                    name="Description"
                    placeholder="Enter description"
                    onChange={inputChange}
                    value={Description}
                  ></textarea>
                </div>
                <div className="buttons">
                  <button onClick={closeModal}>close</button>
                  <button onClick={updatePostSubmit} >Update</button>
                </div>
              </div>
            </Modal>
            <Toaster />
    </>
  );
};

export default AllPost;
