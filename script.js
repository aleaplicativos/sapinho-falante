// declaring variables that will be referenced later
var word1 = [""];
var mouthClasses = [];
var mouf = $('#frogMouth');
var x= .7;

//Dat-GUI to control speech rate and mouth movement variables
var rectangleObject = {
  mouthSpeed: 200,
  speechRate: .7,
  //bgColor: "#0090f0"
  bgColor: "#890F76"
  //bgColor: "#b22222"
}

var gui = new dat.GUI({ autoPlace: false, closeOnTop: true, width: 190, closed: false });
//gui.domElement.id = 'gui';
//sets minimum delay between changing mouths to .01sec and max to 2sec
gui.add(rectangleObject,'mouthSpeed', 10, 2000);
//sets minimum speech rate to .01 and max to 3. Unsure what the measurement is
gui.add(rectangleObject,'speechRate', 0.01, 3);
gui.addColor(rectangleObject, 'bgColor');
gui.close();

var customContainer = $('#gui').append($(gui.domElement));


//$(".full-screen").css("background-color",rectangleObject.bgColor);
//document.body.style.backgroundColor = rectangleObject.bgColor;
document.getElementById("full").style.backgroundColor = rectangleObject.bgColor;

var phoneys = [
  {
    Name: "O",
    Num: 0,
    Definition: "Phoneme for rest face",
    SmallBox:
      "<span class='box' onmouseover='hover0()'><span class='frogO'></span></span>"
  },
  {
    Name: "AaAhAoEhHhIhKUh",
    Num: 1,
    Definition: "Phonemes for aa|ah|ao|eh|hh|ih|k|uh",
    SmallBox:
      "<span class='box' onmouseover='hover1()'><span class='frogAaAhAoEhHhIhKUh'></span></span>"
  },
  {
    Name: "AeAyEyIy",
    Num: 2,
    Definition: "Phonemes for ae|ay|ey|iy",
    SmallBox:
      "<span class='box' onmouseover='hover2()'><span class='frogAeAyEyIy'></span></span>"
  },
  {
    Name: "AwOwOyUwW",
    Num: 3,
    Definition: "Phonemes for aw|ow|oy|uw|w",
    SmallBox:
      "<span class='box' onmouseover='hover3()'><span class='frogAwOwOyUwW'></span></span>"
  },
  {
    Name: "ChErJhRShYZh",
    Num: 4,
    Definition: "Phonemes for ch|er|jh|r|sh|y|zh",
    SmallBox:
      "<span class='box' onmouseover='hover4()'><span class='frogChErJhRShYZh'></span></span>"
  },
  {
    Name: "BMP",
    Num: 5,
    Definition: "Phonemes for b|m|p",
    SmallBox:
      "<span class='box' onmouseover='hover5()'><span class='frogBMP'></span></span>"
  },
  {
    Name: "FV",
    Num: 6,
    Definition: "Phonemes for f|v",
    SmallBox:
      "<span class='box' onmouseover='hover6()'><span class='frogFV'></span></span>"
  },
  {
    Name: "DhLTh",
    Num: 7,
    Definition: "Phonemes for dh|l|th",
    SmallBox:
      "<span class='box' onmouseover='hover7()'><span class='frogDhLTh'></span></span>"
  },
  {
    Name: "DGNNgSTZ",
    Num: 8,
    Definition: "Phonemes for d|g|n|ng|s|t|z",
    SmallBox:
      "<span class='box' onmouseover='hover8()'><span class='frogDGNNgSTZ'></span></span>"
  }
];



//Begin rita implementation

/*
This code was inspired by Daniel Shiffman and his creative coding tutorials. Especially the one about RITA.js: https://www.youtube.com/watch?v=lIPEvh8HbGQ

RITA.js library: Howe, D. C. (2015). RiTa [Computer software]. Retrieved from http://rednoise.org/rita

*/

//runs the rita function on change
$("#userInputYo").change(processRITA());


// Uses the RITA js library to parse everything into arrays

function processRITA() {
  
  //reset array
  mouthClasses = [];
  
  //grab user input and set it to a variable
  var usertext = $("#userInputYo").val();
  
  //set phonemes from user input to its own variable
  var y = RiTa.getPhonemes(usertext);

  //split the phonemes by spaces within the getPhonemes array. Use https://regexr.com/ to test
  var phonetic = y.split(/(\W+|"")/);

  //split phonemes by whitespace characters within the getPhonemes array
  var animation = y.split(/(\s|"")/);

  //set the firstword to the array beginning at the spliced-in space
  var firstword = animation.slice(0, animation.indexOf(" "));

  //set output area to the phonemes of what the user types
  var ouputArea = document.getElementById("outputArea");
  var allPhonemes = RiTa.getPhonemes(usertext);
  ouputArea.innerHTML = allPhonemes;

  //runs phoneme2Num funtion (defined below)
  phoneme2Num();

}

//converts each phoneme to a number and then that number to a css mouth
function phoneme2Num() {
  
  var striii = document.getElementById("outputArea").innerHTML;

  var phonemic = striii.replace(/aa|ah|ao|eh|hh|ih|k|uh/g, "1"); //1 frogAaAhAoEhHhIhKUh
  var phonemic2 = phonemic.replace(/ae|ay|ey|iy/g, "2"); //2 frogAeAyEyIy
  var phonemic3 = phonemic2.replace(/aw|ow|oy|uw|w/g, "3"); //3 frogAwOwOyUwW
  var phonemic4 = phonemic3.replace(/ch|er|jh|r|sh|y|zh/g, "4"); //4 frogChErJhRShYZh
  var phonemic5 = phonemic4.replace(/b(?!ox)|m(?!age|g)|p/g, "5"); //5 frogBMP
  var phonemic6 = phonemic5.replace(/f|v/g, "6"); //6 frogFV
  var phonemic7 = phonemic6.replace(/dh|l(?!ass)|th/g, "7"); //7 frogDhLTh
  var phonemic8 = phonemic7.replace(
    /d|g(?!"|z|2|\ss)|n(?!g)|ng(?!")|s(?!r|s|pan|eov|=)|t|z(?!z|1)/g,
    "8"
  ); //8 frogDGNNgSTZ
  var phonemic9 = phonemic8.replace(/\s(?!cla|src)/g, "<br/>"); //9 spaces
  var phonemic10 = phonemic9.replace(/-/g, "");
  var phonemic11 = phonemic10
    /*.replace(
      "0",
      phonemes[0].SmallBox
    )*/
    .replace(
      /1(?!\()/g,
      phoneys[1].SmallBox
    )
    .replace(
      /2(?!\()/g,
      phoneys[2].SmallBox
    )
    .replace(
      /3(?!\()/g,
      phoneys[3].SmallBox
    )
    .replace(
      /4(?!\()/g,
      phoneys[4].SmallBox
    )
    .replace(
      /5(?!\()/g,
      phoneys[5].SmallBox
    )
    .replace(
      /6(?!\()/g,
      phoneys[6].SmallBox
    )
    .replace(
      /7(?!\()/g,
      phoneys[7].SmallBox
    )
    .replace(
      /8(?!\()/g,
      phoneys[8].SmallBox
    );
  word1 = phonemic11.split("");


  outputArea.innerHTML = word1.join("");

  
  //jsfiddle.net/GzKHA/
  //gets all of the grandchild elements of the boxes with mouth classes in em
  var mouthDivs=$("#outputArea").children().children();
     $.each(mouthDivs,function (index,item) {
      //pushes the class names into an array to be used later for animating
       mouthClasses.push($(item).attr("class"));
       
     });

       //pushes 3 rest face classes at the end of the array
       mouthClasses.push("frogO","frogO","frogO");
}


var allPhClasses = "frogBMP frogFV frogBMP frogAeAyEyIy frogAwOwOyUwW frogChErJhRShYZh frogDhLTh frogDGNNgSTZ frogAaAhAoEhHhIhKUh";

function hover1() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[1].Name);
}
function hover2() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[2].Name);
}
function hover3() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[3].Name);
}
function hover4() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[4].Name);
}
function hover5() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[5].Name);
}
function hover6() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[6].Name);
}
function hover7() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[7].Name);
}
function hover8() {
  $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[8].Name);
}

function resetIt(){
   $("#frogMouth")
    .removeClass(allPhClasses)
    .addClass("frog" + phoneys[0].Name);
}

function showIt(){
  $("#outputArea").slideToggle();
}



function animateMouth() {
  //this starts at 2 because the 3 rest faces take up the 0,1,2 index spaces
  var mouthChanges = 2;
  
//cycling through classes sub-function inspired by: http://jsfiddle.net/c2uqp/  
  (function nextMouth() {
    
  setTimeout(function () {
    //removes the first array item and pushes it to the end of the array
    mouthClasses.push(mouthClasses.shift());
    //removes the frog mouth classes and adds whichever class is in the current 0 spot
    mouf.removeClass().addClass(mouthClasses[0]);
    
    //increment the mouthChanges variable
    mouthChanges++
    //if the incremented variable is less than the length of the array, rerun the 'nextMouth()' function
    if (mouthChanges<=mouthClasses.length){

      //runs the function again after a timeout setting
      nextMouth();
    }
    //once the mouthChanges variable gets to the length of the mouthClasses array, stop.
    else{
      return false;
    }
    
  }, rectangleObject.mouthSpeed); // delay
}());
}


//Eye movement logic. jQuery...
//Thanks to Kxrl: https://codepen.io/Kxrl/pen/BOPNXN
$(".full-screen").mousemove(function(event) {
  var eye = $(".eye");
  var x = eye.offset().left + eye.width() / 2;
  var y = eye.offset().top + eye.height() / 2;
  var rad = Math.atan2(event.pageX - x, event.pageY - y);
  var rot = rad * (180 / Math.PI) * -1 + 180;
  eye.css({
    "-webkit-transform": "rotate(" + rot + "deg)",
    "-moz-transform": "rotate(" + rot + "deg)",
    "-ms-transform": "rotate(" + rot + "deg)",
    transform: "rotate(" + rot + "deg)"
  });
  var eye2 = $(".eye2");
  var x2 = eye2.offset().left + eye2.width() / 2;
  var y2 = eye2.offset().top + eye2.height() / 2;
  var rad2 = Math.atan2(event.pageX - x2, event.pageY - y2);
  var rot2 = rad2 * (180 / Math.PI) * -1 + 180;
  eye2.css({
    "-webkit-transform": "rotate(" + rot2 + "deg)",
    "-moz-transform": "rotate(" + rot2 + "deg)",
    "-ms-transform": "rotate(" + rot2 + "deg)",
    transform: "rotate(" + rot2 + "deg)"
  });
});

var synth = window.speechSynthesis;
var voices = synth.getVoices();

//native speech synthesis
var textBox = document.getElementById("userInputYo");
function say(text1) {
var msg = new SpeechSynthesisUtterance(text1);
msg.pitch = 9999;
msg.voices = 1;
msg.rate = rectangleObject.speechRate;
speechSynthesis.speak(msg);
}
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 13) {
        say(textBox.value);
        animateMouth();
    }
}

//Make the cursor a butterfly... All credit to https://codepen.io/robdimarzo/pen/qmMKJm

//Track location of cursor
$("body").mousemove(function(cursor){
	var xLeft = cursor.pageX;
	var yTop = cursor.pageY;
	$("#cursor").css("left",(xLeft-21)).css("top",(yTop-21));
});

//Apply emoji to #cursor::after 
function applyEmoji(){
  $("#cursor").attr("data-after","🦋");
}

applyEmoji();