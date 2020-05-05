import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Artist.css';
import AzureStorage from "azure-storage/browser/azure-storage.blob.export";
export default class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }
    }
    checkMimeType = (event) => {
        let files = event.target.files
        let err = []
        const types = ['audio/mp3', 'audio/wav']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err[x] = files[x].type + ' is not a supported format\n';
            }
        };
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }
    maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
        return true;
    }
    checkFileSize = (event) => {
        let files = event.target.files
        let size = 2000000000000000000000
        let err = [];
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + ' is too large, please pick a smaller file\n';
            }
        };
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }
    onChangeHandler = event => {
        var files = event.target.files
        if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
            this.setState({
                selectedFile: files,
                loaded: 0
            })
        }
    }
    onClickHandler = () => {
        const data = new FormData()
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
        var blobeable = this.state.selectedFile[0];
        var blobtype = this.state.selectedFile[0].type;
        var blobsize = this.state.selectedFile[0].size;
        var blobname = this.state.selectedFile[0].name;
        var cokie = document.cookie;
    
        axios.get('/auth')
            .then((response) => {
                var blobUri = 'http://127.0.0.1:10000/devstoreaccount1';
                var blobService = AzureStorage.createBlobServiceWithSas(blobUri, response.data);
             
                try {
                    blobService.createBlockBlobFromBrowserFile(
                        "assets",
                        blobname,
                        blobeable,
                        { blockSize: blobsize },
                     
                                (error, result) => {
                                    if (error) {
                                    toast.error("Bad Request, Try again. This file already exist")
                                    } else {
                                        console.log(cokie);
                                        console.log(result.name);
                                        const song = {
                                            Songname: result.name,
                                            Artist: cokie
                                        }
                                        axios.post("music/agregar", song)
                                            .then(res => {
                                                console.log(res)
                                            })
                                            .catch(err => console.log(err))
                                  
                                    toast.success("Everything is cool with your file");
                                }
                            });
                } catch (e) {
                    toast.error("Bad Request, Try again. This file already exist")
                }
            }).then(() => {
                console.log("Hola")
            })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div className="form-group files">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" multiple onChange={this.onChangeHandler} />
                        </div>
                        <div class="form-group">
                            <ToastContainer />
                        </div>

                        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

                    </div>
                </div>
            </div>
        );
    }
}