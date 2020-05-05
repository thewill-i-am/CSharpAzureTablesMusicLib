import React, { Component } from 'react';
import axios from 'axios';
import AudioPlayer from "react-h5-audio-player";
import 'react-toastify/dist/ReactToastify.css';
import './Artist.css';
export default class ListOfSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            list: []
        }
    }
    componentDidMount() {
        axios.get('/music')
            .then((response) => {
                this.setState({
                    list: response,
                    isLoading: false
                })
            })
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        {!this.state.isLoading ? (this.state.list.data.map((item, index) => {
                            return (<ul><p key={index}>Artist : {item.artist}</p><p key={index}>Song : {item.songname}</p><p key={index}><AudioPlayer
                                src={"http://127.0.0.1:10000/devstoreaccount1/assets/"+ item.songname}
                                onPlay={e => console.log("onPlay")}
                            /></p><hr/></ul>)
                        })) : <h3>Loading...</h3>}
                    </div>
                </div>
            </div>
        );
    }
}