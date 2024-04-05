import { Box, Typography } from "@mui/material";
import './fileupload.css';
import iconUpload from '../../../../public/images/icon_upload.svg';
import { useState } from "react";

export default function FileUpload() {
  const [file, setfile] = useState(null);
  const [fileName, setFileName] = useState("No selected file")
  return (
    <Box sx={{textAlign: "left"}}>
      <Typography variant='labelLight'>Upload photos or videos</Typography>
      <Box className="fileUploadContainer">
        <Box className="fileUpload" onClick={()=> document.querySelector(".input-field").click()}>
          <input type="file" accept="image/*, video/*" className="input-field" multiple hidden onChange={({target: {files}})=> {
            files[0] && setFileName(files[0].name)
            if(files) {
              setfile(URL.createObjectURL(files[0]))
            }
          }} />
          { file? 
          <Box  className="fileUploaded">
            <img src={file} alt={fileName} /> 
          </Box> :
          <Box className="fileUploadDefault">
            <img src={iconUpload} /> 
            <Typography>Click here to upload</Typography>
          </Box>
          }
        </Box>
      </Box>
    </Box>
  );
}