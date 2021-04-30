import React, { useState, useEffect } from "react";
import './App.css';
import io from "socket.io-client";
import audioFile from './mj.mp3';

const socket=io.connect("http://localhost:5000");

const audio=new Audio("https://cdnm.meln.top/mr/Michal%20Jackson%20-%20Jam%20%28Live%29.mp3?session_key=93db03735c9373178e386597dc188c1e&hash=79571781d56efe6a4dad64f61ce2d72a");



function App() {

const [role, setRole] = useState("");
const [playing,setPlaying]=useState("");


useEffect(() => {
    function recivedMsg(m){
      console.log(m)
      if(true){
        audio.src="https://cdnm.meln.top/mr/Michal%20Jackson%20-%20Jam%20%28Live%29.mp3";
        audio.play();
        setPlaying(m.name)
      }
      else{
      }
      
    }
    function stopAudio(){
      setPlaying('')
    }

    socket.on('play',recivedMsg);
    socket.on('stop',stopAudio);

    return ()=>{
      socket.off('play',recivedMsg);
       socket.off('stop',stopAudio);
    }
}, [role]);

useEffect(() => {

  function handelAudioStop(){
    socket.emit('stop')
  }
  audio.addEventListener("pause",handelAudioStop)
  return ()=>{
    audio.removeEventListener("pause",handelAudioStop)
  }
}, [])

function handlePlaySound(e){
  e.preventDefault();
  socket.emit('play',{
    name:'MJ',
    path:audioFile
  })
}
  
  return (
    <div className="App">
      <h1>Sound Bot</h1>
      <div>
        <h3>Role</h3>
        <button onClick={()=>setRole('client')}>Client</button>
        <button onClick={()=>setRole('server')}>Server</button>
      </div>
      <div>
        <h4>Choose Sound</h4>
        <button onClick={handlePlaySound}>Play Sound</button>
      </div>
      <div>
        <h4>Playong {playing}</h4>
      </div>

    </div>
  );
}

export default App;
