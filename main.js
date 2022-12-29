lwY = 0 ;
lwX = 0 ;
rwX = 0 ;
rwY = 0 ;
song1 = "" ;
song2 = "" ;

function preload() 
{
    song1 = loadSound("music.mp3") ;
    song2 = loadSound("2.mp3") ;
}

function setup() 
{
    canvas = createCanvas(600,500) ;
    canvas.center() ;

    video = createCapture(VIDEO) ;
    video.hide() ;

    poseNet  = ml5.poseNet(video, modelLoaded) ;
    poseNet.on('pose', gotPoses) ;
}

function gotPoses(results) 
{
    if(results.length>0)
    {
        console.log(results);

        lwX = results[0].pose.leftWrist.x ;
        lwY = results[0].pose.leftWrist.y ;
        console.log(lwX,lwY);

        rwX = results[0].pose.rightWrist.x ;
        rwY = results[0].pose.rightWrist.y ;
        console.log(rwX,rwY);
    }
}

function modelLoaded() 
{
    console.log("PoseNet Is Initialized!");    
}

function draw() 
{
    image(video,0,0,600,500) ;
}

function play() 
{
    song2.play() ;
    song2.setVolume(1) ;
    song2.rate(1) ;
}