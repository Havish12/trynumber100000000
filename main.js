song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
leftWristY=0;
speed=0;

scoreLeftWrist ="";
scoreRightWrist ="";


function preload()
{
    song1 = loadSound("bdayaudio.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized")
}


function draw()
{
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("div_speed").innerHTML = "Speed =" + speed;
        song.setVolume(speed);
        song1.stop();

        if(song1=false)
        {
            song2.play();
            document.getElementById("div_speed").innerHTML = "Speed =" +speed;
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        InNumberRightWristY = Number(rightWristY);
        remove_decimals = floor(InNumberRightWristY);
        volume = remove_decimals/500;
        document.getElementById("div_speed").innerHTML = "Speed =" + speed;
        song.setVolume(speed);
        song2.stop();

        if(song1=false)
        {
            song2.play();
            document.getElementById("div_speed").innerHTML = "Speed =" +speed;
        }
    }


}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX + "leftWristyY =" +leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("leftWristX =" + leftWristX + "leftWristyY =" +leftWristY); 

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist =" + scoreLeftWrist);
}
}