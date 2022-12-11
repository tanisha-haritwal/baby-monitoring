status="";
objects=[];
song="";
function preload(){
song = loadSound("alarm.mp3");
}
    
function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Object";    

}
function start(){
console.log("Object Detection has started");
}

function modelLoaded(){
console.log("Model Loaded !");
status=true;
}

function gotResult(error, results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
image(video, 0, 0, 380, 380);
if(status != ""){
r = random(255);
g = random(255);
b = random(255);
objectDetector.detect(video, gotResult);
for(i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML="Status: Object Detected";


fill(r, g, b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%",objects[i].x +15, objects[i].y +15);
noFill();
stroke(r, g, b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

if(objects[i].label == "person"){
document.getElementById("status1").innerHTML="Status: Baby Detected";
console.log("Song has stopped");
song.stop();
}
else{
document.getElementById("status1").innerHTML="Status: Baby Not Detected";
console.log("Song is playing");
song.play();
}
}
if(objects[i].length == 0 ){
document.getElementById("status1").innerHTML="Status: Baby Not Detected";
song.play();
}
}
}