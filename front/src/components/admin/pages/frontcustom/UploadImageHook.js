
import React, { useState } from "react";
import axios from "axios"
// import FlashMessage from "./FlashMsg"
// import DragAndDrop from './DragAndDrop'



const UploadImage = (props) => {

    const [files, setFiles] = useState([]);
    // const [message, setMessage] = useState({
    //     type: '',
    //     text: ''
    //   });


//     const onChangeHandler = e => {
//         if (props.length < 5) {
//             for (var i = 0; i < e.target.files.length; i++) {
//                 if (!e.target.files[i]) return
//                 setFiles([...files, e.target.files[i]])
//             }
//         } else {
//             alert ("Attention il n'est pas possible d'avoir plus de 5 images dans le slider");
//         }   
// }

const onChangeHandler = e => {

    if (props.length < 5) {
        let fileList = files;
        for (var i = 0; i < e.target.files.length; i++) {
            if (!e.target.files[i]) return
            fileList.push(e.target.files[i])
            // console.log("filelist", fileList)
           
        }
       setFiles([...files], fileList)
        // console.log("filelistfinal", fileList)
        // console.log("files", files)
    } else {
        alert ("Attention il n'est pas possible d'avoir plus de 5 images dans le slider");
    }   
}

    const onClickHandler = e => {
        e.preventDefault();
        // const files = files;
        const data = new FormData();
        for (const key of Object.keys(files)) {
            data.append('file', files[key])
        }
        axios
            .post("/image-slider/", data)
            .then(res => {
                if (res.error) {
                    alert("Erreur lors de l'upload de l'image", res.error);
                } else {
                    alert(`l'image a été ajoutée avec succès!`);
                }
            })
            // .catch(e => {console.error(e);});
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
            {/* <div className="row">
                <FlashMessage
                    duration={10000}
                    persistOnHover={true}
                    type={message.type}
                    message={message.text}
                    close={() => reset()} />
            </div> */}
            <div className="row">
                <div className="col-12 text-center my-3">
                    <h1 className="">Uploader les images ici</h1>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-upload mx-1"></i></span>
                </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" name="file" multiple onChange={onChangeHandler} />
                    <label className="custom-file-label">Choose file</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block my-4 blue"
                    onClick={onClickHandler}>
                    Upload
                </button>
            </div>
            {/* <div>
                <DragAndDrop handleDrop={this.handleDrop}>
                    <div className="content-dd"></div>
                </DragAndDrop>
            </div> */}
            <div>
                <div className="row">
                    <ul>
        {files && files.map((file,i) =>  <li key={i}>{file.name}</li>)}
                    </ul>
                </div>
            </div> 
        </>
    )
}


export default UploadImage