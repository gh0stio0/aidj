function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
   poseNet= ml5.poseNet(video, modelloaded)
   poseNet.on('pose', gotPoses)
}
function draw(){
    image(video,0,0,600,500)
    fill('#FF0000')
    stroke('#FF0000')
    if(scoreleftWrist>0.2){
        circle(leftWristx,leftWristy,20)
        InNumberleftWristy=Number(leftWristy)
        remove_decimals=floor(InNumberleftWristy)
        volume=remove_decimals/500
        document.getElementById("volume").innerHTML="volume"+volume
        song.setVolume(volume)
    }
if(scorerightWrist>0.2){
    circle(rightWristx,rightWristy,20)
    if(rightWristy>0 &&rightWristy<=100){
        document.getElementById("speed").innerHTML="speed=0.5x"   
        song.rate(0.5)

    }
    else if(rightWristy>100 &&rightWristy<=200){
        document.getElementById("speed").innerHTML="speed=1x"
        song.rate(1)
    }
    else if(rightWristy>200 &&rightWristy<=300){
        document.getElementById("speed").innerHTML+"speed=1.5x"
        song.rate(1.5)
    }
    else if(rightWristy>300 &&rightWristy<=400){
        document.getElementById("speed").innerHTML+"speed=2x"
        song.rate(2)
    }
    else if(rightWristy>400 &&rightWristy<=500){
        document.getElementById("speed").innerHTML+"speed=2.5x"
        song.rate(2.5)
    }
    
}
    

}
song=""
leftWristy=0
leftWristx=0
rightWristx=0
rightWristy=0
function preload(){
song=loadSound("music.mp3")

}
function play(){
    song.play()
    song.setVolume(1)
    song.setRate(1)
}
function modelloaded(){
    console.log("poseNet model has been started")
    
}
function gotPoses(results){
 if(results.length>0){
leftWristx= results[0].pose.leftWrist.x
leftWristy= results[0].pose.leftWrist.y
console.log("leftWristx="+leftWristx+"leftWristy"+leftWristy)
rightWristx= results[0].pose.rightWrist.x
rightWristy= results[0].pose.rightWrist.y
console.log("rightWristx"+rightWristx+"rightWristy"+rightWristy)
scoreleftWrist=results[0].pose.keypoints[9].score
console.log("scoreleftWrist"+scoreleftWrist)
scorerightWrist=results[0].pose.keypoints[10].score
console.log("scorerightWrist"+scorerightWrist)

 }   
}