
import React, { useState } from "react";
import axios from "axios"


const UploadImage = (props) => {

const [files, setFiles] = useState([])


const onChangeFile = (e) => {
        let fileList = files;
        for (var i = 0; i < e.target.files.length; i++) {
            if (!e.target.files[i]) return
            const blob = URL.createObjectURL(e.target.files[i])
            fileList.push(e.target.files[i], blob)
            console.log('filelist', fileList)
            
            // const NewFileList = [...fileList.File, blob]
            // console.log('NewFileListNew', FileList)
            setFiles([...files], fileList)
        }
       
       props.setFakeDataImage(files)
       console.log('state files', files)
       
}

 

   
    return (
      <>
  
          <div className="row">
            <div className="col-12 text-center my-3">
              <h4 className="">Choisir les images ici</h4>
            </div>
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-upload mx-1"></i>
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="file"
                accept="image/png, image/jpeg, image/gif"
                multiple
                onChange={onChangeFile}
              />
              <label className="custom-file-label">Choisir le fichier</label>
            </div>
          </div>
          <div>
            <div>
              <ul className="mt-3 mr-auto ml-auto w-100">
                {files &&
                  files.map((item, i) => (
                    <li className="w-100 m-auto text-center" key={i}>
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
      </>
    );
}


export default UploadImage