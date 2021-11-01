//vars
var img = " ";
var canvas = " ";
var s1 = " "; 
var object_detect = " ";
var object = [];
var vid =" ";

function preload() {
     img = loadImage("dog_cat.jpg");
}

function setup() {
     canvas = createCanvas(380, 380);
     canvas.center();
     vid = createCapture(VIDEO);
     vid.hide();

     object_detect = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Detecting..."; 

}

function modelLoaded(){
     console.log("Model loaded");
     s1 = true;
     object_detect.detect(img, gotResults);
}

function draw() {
     image(vid, 0, 0, 380, 380);
     if (s1 != " ") {
          for (let i = 0; i < object.length; i++) {
               document.getElementById("status").innerHTML = "Detected";
               document.getElementById("number_of_object").innerHTML = "Number of Objects detected: " + object.length;
               fill("#000");
               var percent = floor(object[i].confidence * 100);
               text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
               noFill();
               stroke("#000");
               rect(object[i].x, object[i].y, object[i].width, object[i].height);
               
          }
     }else{
          console.error("There has been an error");
     }


}

function gotResults(error, results){
     
     if (error) {
          console.error(error);
     } else {
          console.log(results);
          
          object = results;
     }

}