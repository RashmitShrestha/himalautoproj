let video;
let poseNet;
let pose;
let skeleton;
let circle1X = 100;
let circle1Y = 100;
let circle2X = 200;
let circle2Y = 100;
let diameter = 50;
let img;
let ranx = getRandomInt(70, 560);
let rany = getRandomInt(70, 410);
let interval; 
let activate = false; 
let timee = 0;
let cc = 0; 
let first = true;

document.getElementById("btnn").addEventListener("click", () => {

activate = true;



interval = setInterval(() => {

  document.getElementById("time").innerHTML = timee;
  document.getElementById("score").innerHTML = cc;

  timee++;
  first = !first;
 }, 1000)


})

function preload() {
  img = loadImage('img/enemy.png'); // Load the image

  
}


function setup() {
  createCanvas(630, 480).parent("canvasEl");
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);

}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0);


  image(img,ranx, rany);

  

  if (pose) {
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
  
    if (
    (  pose.rightWrist.x >= ranx &&
      pose.rightWrist.x <= (ranx + 50) &&
      pose.rightWrist.y >= rany &&
      pose.rightWrist.y <= (rany + 50))

      || 

      (  pose.leftWrist.x >= ranx &&
        pose.leftWrist.x <= (ranx + 50) &&
        pose.leftWrist.y >= rany &&
        pose.leftWrist.y <= (rany + 50))
        
      

    )
  {
    ranx = getRandomInt(100, 530);
   rany = getRandomInt(100, 380);
   if (activate) {   
     cc++;   
    }

    if (cc === 40) {

      clearInterval(interval);
      document.getElementById("canvasEl").remove();

      const para = document.createElement("p");
      const node = document.createTextNode(`Congrats you completed your training in ${timee} seconds! \n Refresh the page to train again!`);
      para.appendChild(node);
      
      const element = document.getElementById("ppnode");
      element.appendChild(para);


    }



  }
}
  }
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}