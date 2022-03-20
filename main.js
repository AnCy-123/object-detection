video= ""
objects = [];
modelStatus = "";
function preload(){
  video = createVideo('video.mp4');
}
function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
}
function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
  console.log("Model has loaded")
  modelStatus = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}
function draw() {
  image(video, 0, 0, 480, 380);
  if (modelStatus != "") {
      objectDetector.detect(video, gotresults);
      for (i=0;i < objects.length;i++){
          document.getElementById("status").innerHTML = "Status : Objects Detected";
          document.getElementById("numberofobj").innerHTML = "Number Of Objects Detected Are : " + objects.length;
          fill("red");
          percent = floor(objects[i].confidence*100);
          text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
          noFill();
          stroke("red");
          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
  }
}
function gotresults(error,results){
    if (error){
        console.log(error);
    } else {
        console.log(results);
        objects=results;
    }
}
