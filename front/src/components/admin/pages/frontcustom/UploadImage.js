
import React from "react"
import axios from "axios"
import FlashMessage from "./FlashMsg"
// import DragAndDrop from './DragAndDrop'


// import React, { useState, useEffect } from "react";
// import axios from "axios";


// const UploadImage = () => {
//     return (
//         <>
        
//         <div> upload image</div>
//         </>
//     )
// }



class UploadImage extends React.Component {
    state = {
        files: [],
        message: {
            type: '',
            text: ''
        }
    }

    onChangeHandler = e => {
        let fileList = this.state.files;
        for (var i = 0; i < e.target.files.length; i++) {
            if (!e.target.files[i]) return
          fileList.push(e.target.files[i])
          }
        
        this.setState({files: fileList}, () => console.log(this.state))
    }

    onClickHandler = e => {
        e.preventDefault();
        const files = this.state.files
        const data = new FormData();
        for (const key of Object.keys(files)) {
            data.append('file', this.state.files[key])
        }
        axios
            .post("/image-slider/", data)
            .then(res => {
                this.setState({
                    message: {
                        type: 'success',
                        text: 'Files uploaded with success',
                        isVisible: true
                    }
                }, () => this.state)
            })
            
            .catch(error => {
                this.setState({
                    message: {
                        type: 'error',
                        text: 'Error, try again'
                    }
                }, () => this.state)
            });
    }

    reset() {
        window.location.reload();
    }

    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
          if (!files[i]) return
          fileList.push(files[i])
        }
        this.setState({files: fileList}, () => console.log(this.state))
    }

    render() {
        console.log("files",this.state.files)
        return (
            <>
                <div className="row">
                    <FlashMessage
                        duration={10000}
                        persistOnHover={true}
                        type={this.state.message.type}
                        message={this.state.message.text}
                        close={() => this.reset()} />
                </div>
                <div className="row">
                    <div className="col-12 text-center my-3">
                        <h1 className="">Upload your Files here</h1>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-upload mx-1"></i></span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" name="file" multiple onChange={this.onChangeHandler} />
                        <label className="custom-file-label">Choose file</label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block my-4 blue"
                        onClick={this.onClickHandler}>
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
                            {this.state.files && this.state.files.map((file,i) =>  <li key={i}>{file.name}</li>)}
                        </ul>
                    </div>
                </div> 
            </>
        )
    }
}

export default UploadImage