import React,{useState, useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Blogeditior = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // useEffect(() => {
  //   console.log("state: " , editorState);
  // }, [editorState]);

  const HandleChange = e => {
    setEditorState(e.target.value)
    console.log(e.target);
  }


  return (
  <>
   
        <div className='editor'>
       <Editor
                  editorState={editorState}
                  onEditorStateChange={HandleChange}
                />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>

  </>
  )
}

export default Blogeditior

















