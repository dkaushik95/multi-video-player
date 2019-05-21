import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import "../../node_modules/video-react/dist/video-react.css";
import './Home.css'
import { Player } from 'video-react';
import { AppBar, Toolbar, Typography, Grid, Paper, Icon, CircularProgress, Divider, IconButton, Fab, TextField, Button } from '@material-ui/core';


export default class Home extends Component {
    state = {
        isVideoEnabled: false,
        video: null,
        inProgress: false,
        isVideo2Enabled: false,
        video2: null,
        inProgress2: false,
        isplaying: false,
        fpsInput: '',
        fps: 30
    }

    onDrop = acceptedFiles => {
        let file = acceptedFiles[0]
        let reader = new FileReader()
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

    toggle = () => {
        if(this.state.isplaying) {
            this.refs.player.pause()
            this.refs.player2.pause()
            this.setState({isplaying: false})
        }
        else{
            this.refs.player.play()
            this.refs.player2.play()
            this.setState({isplaying: true})
        }
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
        this.refs.player.seek(-currentTime)
        this.refs.player2.seek(-currentTime)
    }

    seek = (time) => {
        const {fps} = this.state
        const timefps = time > 0 ? 1/fps : -1/fps
        const currentTime = this.refs.player.getState().player.currentTime
        this.refs.player.seek(currentTime + timefps)
        this.refs.player2.seek(currentTime + timefps)
    }

    changeInput = (evt) => {
        this.setState({
            fpsInput: evt.target.value
        })
    }

    onchangeFps = (evt) => {
        evt.preventDefault()
        this.setState({
            fps: this.state.fpsInput,
            fpsInput: ''
        })
    }

    render() {
        const buttonDisabled = !this.state.isVideoEnabled || !this.state.isVideo2Enabled
        return (
            <div>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' color='inherit' noWrap>
                            Multi video player
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Typography style={{marginTop: 20, marginBottom: 20}} variant='h6' align='center'>Add your videos below to get started</Typography>
                <Divider variant='middle' />
                <Grid container spacing={12}>
                    {/* Video 1 */}
                    <Grid style={{width: '100%', height: 'auto'}} item xs={6}>
                        {this.state.isVideoEnabled ? (
                            <Paper style={{height: '100%'}}>
                                <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <Player
                                    ref='player'
                                    fluid
                                    disableDefaultControls
                                >
                                    <source src={this.state.video} />
                                </Player>
                                </div>
                            </Paper>
                        ) : (
                            <Dropzone onDrop={this.onDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <Paper style={{height: '100%'}}>
                                        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div style={{position: 'relative'}}>
                                                <Icon fontSize='large' color='primary'>cloud_upload</Icon>
                                                {this.state.inProgress ? <CircularProgress size='3rem' style={{position: 'absolute', top: -6, left: -6, zIndex: 1}} /> : null }
                                            </div>
                                            <Typography variant='h6'>{this.state.inProgress ? 'Loading Video' : 'Drag or select the first video'}</Typography>
                                        </div>
                                    </Paper>
                                )}
                            </Dropzone>
                        )}
                    </Grid>
                    {/* Video 2 */}
                    <Grid style={{width: '100%', height: 'auto'}} item xs={6}>
                        {this.state.isVideo2Enabled ? (
                            <Paper style={{height: '100%'}}>
                                <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <Player
                                    ref='player2'
                                    fluid
                                    disableDefaultControls
                                >
                                    <source src={this.state.video2} />
                                </Player>
                                </div>
                            </Paper>
                        ) : (
                            <Dropzone onDrop={this.onDrop2}>
                                {({getRootProps, getInputProps}) => (
                                    <Paper style={{height: '100%'}}>
                                        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div style={{position: 'relative'}}>
                                                <Icon fontSize='large' color='primary'>cloud_upload</Icon>
                                                {this.state.inProgress2 ? <CircularProgress size='3rem' style={{position: 'absolute', top: -6, left: -6, zIndex: 1}} /> : null }
                                            </div>
                                            <Typography variant='h6'>{this.state.inProgress2 ? 'Loading Video' : 'Drag or select the second video'}</Typography>
                                        </div>
                                    </Paper>
                                )}
                            </Dropzone>
                        )}
                    </Grid>
                </Grid>
                <Divider variant='middle' />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h5>Controls</h5>
                    <div>
                        <IconButton disabled={buttonDisabled} onClick={this.seek.bind(this, -1)}>
                            <Icon>fast_rewind</Icon>
                        </IconButton>
                        <Fab color='primary' disabled={buttonDisabled} onClick={this.toggle}>
                            <Icon>{this.state.isplaying ? 'pause' : 'play_arrow'}</Icon>
                        </Fab>
                        <IconButton disabled={buttonDisabled} onClick={this.seek.bind(this, 1)}>
                            <Icon>fast_forward</Icon>
                        </IconButton>
                    </div>
                    <div>
                        <IconButton disabled={buttonDisabled} onClick={this.reset}>
                            <Icon>replay</Icon>
                        </IconButton>
                    </div>
                    <div>
                        <Typography variant='body1'>Current FPS: {this.state.fps}</Typography>
                        <form onSubmit={this.onchangeFps}>
                            <TextField onChange={this.changeInput} name='fps' type='number' value={this.state.fpsInput} />
                            <Button type='submit'>Change</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
