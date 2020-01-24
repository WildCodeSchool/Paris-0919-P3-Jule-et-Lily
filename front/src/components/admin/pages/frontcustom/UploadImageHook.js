
import React, { useState } from "react";
import axios from "axios"
// import DragAndDrop from './DragAndDrop'



const UploadImage = (props) => {

    const [files, setFiles] = useState([])
    const [urls, setUrls] = useState([])
  

const onChangeFile = (e) => {
    if (props.length < 5) {
        let fileList = files;
        let fileUrl = urls;
        for (var i = 0; i < e.target.files.length; i++) {
            if (!e.target.files[i]) return
            fileList.push(e.target.files[i])
            fileUrl.push("") 
        }
       setFiles([...files], fileList)
       setUrls([...urls], fileUrl)
      //  console.log('state files', files)
       
    } else {
        alert ("Attention il n'est pas possible d'avoir plus de 5 images dans le slider");
    }   
}


const onChangeUrl = (e) => {
        let i =  e.target.id
        let fileUrl = urls;   
        fileUrl[i] = e.target.value;
        setUrls([...urls], fileUrl)
        // console.log('state urls', urls)
        // console.log('state files', files)
}
    const onClickHandler = e => {
        e.preventDefault();
        const formFiles = new FormData();
        for (const key of Object.keys(files)) { 
            formFiles.append('file', files[key])
        }


        // const formUrls = new FormData();
        // for (const key of Object.keys(urls)) {
        //     formUrls.append('file', urls[key])
        // }


        axios
            .post("/image-slider/image", formFiles)
            .then(res => {
                if (res.error) {
                    alert("Erreur lors de l'upload de l'image", res.error);
                } else {
                    axios
                    .put("/image-slider/url", urls)
                    .then(res => {
                        if (res.error) {
                            alert("Erreur lors de l'upload de l'url", res.error);
                        } else {
                            alert(`l'image a été ajoutée avec succès!`);
                        }
                    })
                }
            })
      
 
          // .catch(e => {
          //   console.error(e);
          // });
        setTimeout(() => window.location.reload(), 2000);
      };
 

    // handleDrop = (files) => {
    //     let fileList = files
    //     for (var i = 0; i < files.length; i++) {
    //       if (!files[i]) return
    //       fileList.push(files[i])
    //     }
    //     setFiles(fileList, () => console.log(this.state))
    // }


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
                      <input
                        type="text"
                        className="form-control mt-2 w-100 m-auto"
                        key={i}
                        id={i}
                        name="url"
                        value={urls[i]}
                        placeholder="Renseigner l'url du lien"
                        onChange={onChangeUrl}
                      />
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
          {/* <div>
                <DragAndDrop handleDrop={this.handleDrop}>
                    <div className="content-dd"></div>
                </DragAndDrop>
            </div> */}
      </>
    );
}


export default UploadImage