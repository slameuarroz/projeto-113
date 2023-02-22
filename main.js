var previsao1 = "";
var previsao2 = "";
Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:1080
});
document.getElementById("camera");
Webcam.attach("#camera");
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
    });
};
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PoqlSi8x9/model.json",modelLoad);
function modelLoad(){
    console.log("model load")
}
function speak(){
    var synth = window.speechSynthesis;
    var speakData1 = "a primeira previsao é" + previsao1;
    var speakData2 = "e a segunda previsao é" + previsao2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML=results[0].label;
        document.getElementById("resultEmotionName2").innerHTML=results[1].label;
        previsao1=results[0].label;
        previsao2=results[1].label;
        speak()
        if(results[0].label == "feliz"){
            document.getElementById("updateEmoji").innerHTML='&#128522'
        }
        if(results[0].label == "triste"){
            document.getElementById("updateEmoji").innerHTML='&#128532'
        }
        if(results[0].label == "irritado"){
            document.getElementById("updateEmoji").innerHTML='&#128548'
        }
        if(results[1].label == "feliz"){
            document.getElementById("updateEmoji2").innerHTML='&#128522'
        }
        if(results[1].label == "triste"){
            document.getElementById("updateEmoji2").innerHTML='&#128532'
        }
        if(results[1].label == "irritado"){
            document.getElementById("updateEmoji2").innerHTML='&#128548'
        }
    }
}