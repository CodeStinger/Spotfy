console.log("Welcome to Spotify");
// Initialize variable
let songIndex =0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName("song-item"));

let songs=[
    {songName: "song1",filePath: "./songs/1.mp3", coverPath:"./covers/1.jpg", duration:"3:50"},
    {songName: "song2",filePath: "./songs/2.mp3", coverPath:"./covers/2.jpg", duration:"2:32"},
    {songName: "song3",filePath: "./songs/3.mp3", coverPath:"./covers/3.jpg", duration:"4:33"},
    {songName: "song4",filePath: "./songs/4.mp3", coverPath:"./covers/4.jpg", duration:"4:27"},
    {songName: "song5",filePath: "./songs/5.mp3", coverPath:"./covers/5.jpg", duration:"3:28"},
    {songName: "song6",filePath: "./songs/6.mp3", coverPath:"./covers/6.jpg", duration:"3:27"},
    {songName: "song7",filePath: "./songs/7.mp3", coverPath:"./covers/7.jpg", duration:"4:33"},
    {songName: "song8",filePath: "./songs/8.mp3", coverPath:"./covers/8.jpg", duration:"3:50"},
    {songName: "song9",filePath: "./songs/9.mp3", coverPath:"./covers/9.jpg", duration:"3:28"},
    {songName: "song10",filePath: "./songs/10.mp3", coverPath:"./covers/10.jpg", duration:"4:27"}
]

songItem.forEach((element ,i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songItem")[0].innerHTML=songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerHTML=songs[i].duration+' <i class="fa-solid songItemPlay fa-circle-play" id='+`${i}`+'></i>';
})

// audioElement.play();
// Handle paly
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play(); 
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }else{
        audioElement.pause(); 
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // Seekbar updating 
     progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
     myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlaces = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        console.log(element);
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        
        makeAllPlaces();
        
        songIndex=parseInt(e.target.id);
        // console.log(e.target.id,songIndex);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`./songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity=1;
        audioElement.currentTime=0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<1){
        songIndex=0;
    }else{
        songIndex-=1;
    }
    audioElement.src=`./songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity=1;
        audioElement.currentTime=0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=9){
        songIndex=0;
    }else{
        songIndex+=1;
    }
    audioElement.src=`./songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.play();
         gif.style.opacity=1;
        audioElement.currentTime=0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})