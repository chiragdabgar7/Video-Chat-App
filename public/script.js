// const { connect } = require("http2")

const socket = io('/')
const videoGrid = document.getElementById('video-gird')
const myPeer = new Peer(undefined, {
    host : '/',
    port : '3001'
})

const myvideo = document.createElement('video')
myvideo.muted = true

navigator.mediaDevices.getUserMedia({
    video : true,
    audio : true
    }).then(stream => {
    addVideoStream(myvideo, stream)

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

// socket.on('user-connected', userId => {
//     console.log("User connected " + userId)
// })

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }

// socket.on('user-connected', userId => {
//     console.log("User disconnected" + userId)
// })