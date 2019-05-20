import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import "../../node_modules/video-react/dist/video-react.css";
import './Home.css'
import { Player, ControlBar } from 'video-react';


export default class Home extends Component {
    state = {
        isVideoEnabled: false,
        video: null,
        inProgress: false,
        isVideo2Enabled: false,
        video2: null,
        inProgress2: false
    }

    onDrop = acceptedFiles => {
        let file = acceptedFiles[0]
        let reader = new FileReader()
        console.log(reader)
        reader.onload = evt => {
            this.setState({
                isVideoEnabled: true,
                video: evt.target.result,
                inProgress: false
            })
        }
        reader.readAsDataURL(file)
        this.setState({
            inProgress: true
        })
        console.log(acceptedFiles)
    }

    onDrop2 = (acceptedFiles) => {
        let file = acceptedFiles[0]
        let reader = new FileReader()
        reader.onload = evt => {
            this.setState({
                isVideo2Enabled: true,
                video2: evt.target.result,
                inProgress2: false
            })
        }
        reader.readAsDataURL(file)
        this.setState({
            inProgress2: true
        })
    }

    play = () => {
        this.refs.player.play()
        this.refs.player2.play()
    }

    pause = () => {
        this.refs.player.pause()
        this.refs.player2.pause()
    }

    reset = () => {
        const currentTime = this.refs.player.getState().player.currentTime
        this.seek(-currentTime)
        // this.refs.player.seek(-currentTime)
        // this.refs.player2.seek(-currentTime)
    }

    seek = (time) => {
        const currentTime = this.refs.player.getState().player.currentTime
        this.refs.player.seek(currentTime + time)
        this.refs.player2.seek(currentTime + time)
    }

    render() {
        return (
            <div>
                <h1>Video player</h1>
                <p>Add your videos below</p>
                {
                    this.state.isVideoEnabled ? (
                        <div className='left'>
                            <Player
                                ref='player'
                                fluid
                                disableDefaultControls
                            >
                                <source src={this.state.video} />
                            </Player>
                        </div>
                    ) : (
                        <div className='left'>
                            <Dropzone onDrop={this.onDrop}>
                            {({getRootProps, getInputProps}) => (
                                <section className='dropzone'>
                                    <div className='dropzoneContainer' {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>{this.state.inProgress ? 'Loading Video' : 'Drag or select the first video'}</p>
                                    </div>
                                </section>
                            )}
                            </Dropzone>
                        </div>
                    ) 
                }

                {/* Video 2 */}
                {
                    this.state.isVideo2Enabled ? (
                        <div className='left'>
                            <Player
                                ref='player2'
                                fluid
                                disableDefaultControls
                            >
                                <source src={this.state.video2} />
                            </Player>
                        </div>
                    ) : (
                        <div className='left'>
                            <Dropzone onDrop={this.onDrop2}>
                            {({getRootProps, getInputProps}) => (
                                <section className='dropzone'>
                                    <div className='dropzoneContainer' {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>{this.state.inProgress2 ? 'Loading Video' : 'Drag or select the second video'}</p>
                                    </div>
                                </section>
                            )}
                            </Dropzone>
                        </div>
                    ) 
                }
                <div className='controls'>
                    <h5>Controls</h5>
                    <div>
                        <button onClick={this.seek.bind(this,-1)}>-10</button>
                        <button onClick={this.play}>Play</button>
                        <button onClick={this.pause}>Pause</button>
                        <button onClick={this.reset}>Reset</button>
                        <button onClick={this.seek.bind(this,+1)}>+10</button>
                    </div>
                </div>
            </div>
        )
    }
}
