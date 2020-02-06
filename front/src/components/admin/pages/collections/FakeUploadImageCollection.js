
import React, { useState } from "react";


const UploadImage = (props) => {

const [files, setFiles] = useState([])
const onChangeFile = (e) => {


  let fileList = files
  for (var i = 0; i < e.target.files.length; i++) {
      if (!e.target.files[i]) return
      const file = e.target.files[i]
      const link = URL.createObjectURL(e.target.files[i])
      fileList.push({file,link})
    }
  setFiles(fileList)   
  const temporaryDataImage = [...props.fakeDataImage] 
  temporaryDataImage.push(...files)
  props.setFakeDataImage(temporaryDataImage)    
  setFiles([])
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
                {props.fakeDataCoverImage &&
                props.fakeDataCoverImage.map((item, i) => (
                  <li className="w-100 m-auto text-center" key={i}>
                    {item.file.name}
                  </li>
                ))}
                {props.fakeDataImage &&
                  props.fakeDataImage.map((item, i) => (
                    <li className="w-100 m-auto text-center" key={i}>
                      {item.file.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
      </>
    );
}


export default UploadImage