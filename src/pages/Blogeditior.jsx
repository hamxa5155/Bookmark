import React,{useState, useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from 'html-react-parser';

const Blogeditior = () => {
  const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty()
);




const [editordata, setEditorData] = useState('')
// console.log(editordata)

// console.log("editorState",editorState.getCurrentContent())
// useEffect(() => {}, [editorState]);
// 

const updateTextDescription = async (state) => {
  await setEditorState(state);
  const data = convertToRaw(editorState.getCurrentContent());
  setEditorData(data.blocks[0].text)
  // console.log("data", editordata.blocks)
  console.log("data", editordata.blocks[0].text)

  // console.log()
  };

  const [blogState, setBlogState] = useState({
    uploadfile: "",
    imageName: null,
    title: "",
    Detail: "",
   
  });



  const handlechange = (e, image) => {
    console.log("comsat lahore");
    if (image) {
      setTeamState({
        ...teamState,
        ["uploadfile"]: URL.createObjectURL(e.target.files[0]),
        ["imageName"]: e.target.files[0],
      });
    } else {
      setBlogState({ ...blogState, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", blogState.imageName);
      formData.append("title", blogState.title);
      formData.append("Detail", blogState.Detail);
      const res = await props.createOurTeam(formData);
      Swal.fire("Successfully uploaded data", "", "success").then(() => {
        // history.push("/dashboard/listings");
      });
    } catch (err) {
      console.log("error", err);
      Swal.fire("Unable to be uploaded data", "", "error");
    }
  };



  return (
  <>
  
 
  
        <div className='editor'>

        <h3>upload Blog image </h3>
          <div>
            <input
             type="file"
              id="file-input"
              onChange={(e) => handlechange(e, "image")}
              className="input_img"
            />


<input
            name="resetpasword"
              type="title"
              value={blogState.resetpasword}
              onChange={(e)=>handleChange(e)}
              placeholder="title"
              className="team_name"
            />

<input
            name="resetpasword"
              type="Detail"
              value={blogState.resetpasword}
              onChange={(e)=>handleChange(e)}
              placeholder="Detail"
              className="team_name"
            />
          </div>
          {blogState.uploadfile ? (
            <div className="img-div">
              <img  alt="" className="image-size" />
            </div>
          ) : (
            ""
          )}
       {parse(`'<h1>single</h1>'`)} 
         <h4>{editordata}</h4> 
        <Editor
editorState={editorState}
toolbarClassName="toolbarClassName"
wrapperClassName="wrapperClassName"
editorClassName="editorClassName"
onEditorStateChange={updateTextDescription}

className="editor_main"
/>
      </div>

      <p className='editor_para'>{editordata}</p>

      <div className='blog_btn'>            <button className="team_button" onClick={() => handleSubmit()}>
              Publish
            </button>
            </div>



      
  </>
  )
}

export default Blogeditior

















































// import React,{useState, useEffect} from 'react'
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from 'draft-js';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


// const Blogeditior = () => {
//   const [editorState, setEditorState] = useState(() =>
//   EditorState.createEmpty()



// );

// const [editordata, setEditorData] = useState("")
// console.log(editordata)

// // console.log("editorState",editorState.getCurrentContent())
// useEffect(() => {}, [editorState]);



//   return (
//   <>
   
//         <div className='editor'>
//         <Editor
//                   editorState={editorState}
//                   onEditorStateChange={setEditorState}
//                   value={editordata}
//                   onChange={(e) => setEditorData(e.target.value)}
//                 />

//       </div>

//   </>
//   )
// }

// export default Blogeditior





