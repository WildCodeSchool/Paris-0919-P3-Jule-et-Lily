
import React, { useState } from "react";
import axios from "axios"


const UploadImage = (props) => {

const [files, setFiles] = useState([])


const onChangeFile = (e) => {
        setFiles ([])
        let fileList = files;
        for (var i = 0; i < e.target.files.length; i++) {
            if (!e.target.files[i]) return
            fileList.push(e.target.files[i])
        }
       setFiles([...files], fileList)
}


    const onClickHandler = e => {
      e.preventDefault();
      const formFiles = new FormData();
      for (const key of Object.keys(files)) {
        formFiles.append("file", files[key]);
      }

      axios
        .post(`/product/image/${props.ProductId}`, formFiles)
        .then(res => {
          if (res.error) {
            alert("Erreur lors de l'upload de l'image", res.error);
          } else {
            alert(`l'image a été ajoutée avec succès!`);
            props.fetchDataImage()
            setFiles([])
          }
        })
    };
 

   
    return (
      <> 
          <div className="row">
            <div className="col-12 text-center my-3">
              <h4 className="">Uploader les images ici</h4>
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
            <div className="input-group">
              <button
                type="submit"
                className="btn btn-primary btn-block my-4 blue mb-5"
                onClick={onClickHandler}
              >
                Upload
              </button>
            </div>
          </div>
      </>
    );
}


export default UploadImage