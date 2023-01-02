lwY = 0 ;
lwX = 0 ;
rwX = 0 ;
rwY = 0 ;
song1 = "" ;
song2 = "" ;
st1 = "";
st2 = "" ;
slw = 0;
srw = 0;

function preload() 
{
    song1 = loadSound("music.mp3") ;
    song2 = loadSound("2.mp3") ;
}

function setup() 
{
    canvas = createCanvas(600,500) ;
    canvas.position(460,300) ;

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
        slw = results[0].pose.keypoints[9].score ;
        console.log("score lw = " + slw);
        srw = results[0].pose.keypoints[10].score ;
        console.log("score rw = " + srw);

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

    fill("FF0000") ;
    stroke("FF0000") ;

    if(slw > 0.2) 
    {
        circle(lwX,lwY,20) ;
        st1 = "true" ;
        document.getElementById("songname").innerHTML = "Song Name : " + "DJ Music" ;
        st2 = "false" ;
    }

    if(srw > 0.2) 
    {
        circle(rwX,rwY,20) ;
        st1 = "false" ;
        document.getElementById("songname").innerHTML = "Song Name : " + "Alex something something ...." ;
        st2 = "true" ;
    }

    if(st1 = "true") 
    {
        song2.stop() ;
        song1.play() ;
        song1.setVolume(1) ;
        song1.rate(1) ;
    }

    if(st2 = "true") 
    {
        song1.stop() ;
        song2.play() ;
        song2.setVolume(1) ;
        song2.rate(1) ;
    }
}

function play() 
{
    song2.play() ;
    song2.setVolume(1) ;
    song2.rate(1) ;

    st2 = "true" ;
    st1 = "false" ;
}