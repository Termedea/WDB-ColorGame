
//General variables
var backgroundColor = "#232323";
var headerColor = "steelblue";
var colorList = [];
var numSquares;  
var score; 
var seconds = 0;
var tenthSeconds = 0
var guesses = 0;
var intervalId;
var highScoreCookie;
var highScoreCookieName = "highScore";

//Elements to manipulate
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.getElementById("resetBtn");
var modeBtns = document.querySelectorAll(".mode");
var timerDisplay = document.getElementById("timerDisplay");
var yourScoreDisplay = document.getElementById("yourScoreDisplay");
var highScoreDisplay = document.getElementById("highScoreDisplay");


/** Initialize game **/
init();
//Set up game parameters
function init(){

	numSquares = 6; 
	highScoreCookie = getCookie(highScoreCookieName);

	if(highScoreCookie){
		highScoreDisplay.textContent = highScoreCookie;
	}

	setUpButtons();
	setUpSquares();	
	startGame();	
}

//Start new game
function startGame(){

	score = 1000;	
	seconds = 0;
	tenthSeconds = 0; 
	guesses = 0;
	renderUI();

	intervalId = setInterval(updateTime, 100);
	setScore(guesses);
}

/***************************************************/


/** Functions for setting up listeners and gui for game **/

function setUpSquares(){
	//EventListeners for squares
	for(var i = 0; i< squares.length; i++)
	{	
		
		//event listeners for squares containing game logic
		squares[i].addEventListener("click", function () {
				
			//grab color of clicked square and compare to correctColor
			var clickedColor = this.style.background;
			if(clickedColor === correctColor){
				//win
				win(clickedColor);
				
			}else{			
				this.style.background =  backgroundColor; 
				messageDisplay.textContent = "Try again!";
				setScore(++guesses);

			}

		})
	}
}

function setUpButtons(){
	//EventListeners for mode buttons
	for(var i = 0; i< modeBtns.length; i++){

		modeBtns[i].addEventListener("click", function(){
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");

			//how many squares to show?
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6; 
			renderUI();
		});
	}
	//EventListener for resetbutton
	resetBtn.addEventListener("click", function(){
		startGame();
	});
}

function renderUI () {
	//generate new colors
	colorList = generateRandomColorsArray(numSquares);	
	//randomize a new correct color
	correctColor = pickCorrectColor();
	//present the correct color as rgb text
	colorDisplay.textContent = correctColor;
	//change the colors of the squares. 
	for(var i = 0; i<squares.length; i++){
		if(colorList[i]){
			squares[i].style.display = "block"; 
			squares[i].style.background = colorList[i];
		}
		else{
			squares[i].style.display = "none"; 
		}
	}

	//reset styles and messages
	h1.style.background = headerColor; 
	messageDisplay.textContent = "";
	resetBtn.textContent = "New Colors";
}

/***************************************************/


/** Functions for updating time and score in game **/

function updateTime(){
	if(tenthSeconds < 9){
			tenthSeconds++;
		}else {
			tenthSeconds = 0;
			seconds++
		}

		timerDisplay.textContent = seconds +"."+tenthSeconds;
}

function setScore(guesses){

	//set score to decrease the more squares you have guessed
	score -=  (guesses * 10);

	//set score to decrease the more time has passed
	score -= (seconds * 10) + tenthSeconds); 

	yourScoreDisplay.textContent = score; 
}

/***************************************************/


/** Functions for game logic **/

//Logic for design and scores upon winning
function win (clickedColor) {	
	//stop timer
	clearInterval(intervalId);	
	
	//determine highscore
	checkHighScore();
	//update ui
	
	messageDisplay.textContent = "Correct!";
	changeToWinningColor(clickedColor);
	resetBtn.textContent = "Play again?";	
}

//Check if the winning score is a highscore
function checkHighScore () {
	//if there is a highscore cookie
	if(highScoreCookie){

		//get it and check if it's lower than score
		var highScore = Number(highScoreCookie);
		if(score > highScore){
			//if it is, set new highscore cookie
			highScore = score; 
			setCookie(highScoreCookieName, highScore)		
		}			
	//if there is no highscorecookie, also set new highscorecookie
	}else{
		highScore = score; 
		setCookie(highScoreCookieName, highScore)		
	}

	highScoreDisplay.textContent = highScore;
}

//Generates single random RGB-color
function getRandomColor(){
	//pick a red from 0 to 255
	var red = Math.floor(Math.random() * 256);

	//pick a green from 0 to 255
	var green = Math.floor(Math.random() * 256);

	//pick a blue from 0 to 255
	var blue = Math.floor(Math.random() * 256);

	//complete RGB-string
	return "rgb("+red+", "+green+", "+blue+")";
}

//Generates all random colors for game (for 3 or 6 squares)
function generateRandomColorsArray (num) {

	var arr = [];
	//add num random colors to the array
	for(var i = 0; i<num; i++){
		arr.push(getRandomColor());
	}
	
	return arr; 
}

//Picks the single correct color randomly from the array of colors
function pickCorrectColor () {
	var random = Math.floor(Math.random() * colorList.length);
	return colorList[random];
}

//Change ui to show the winning color
function changeToWinningColor (color) {
	//loop all squares to change each color
	for(var i = 0; i<colorList.length; i++){
		squares[i].style.background = color; 
	}
	h1.style.background = color; 
}

/***************************************************/


/** Borrowed functions for cookie handling. **/

function setCookie (name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "90";
    }
   
    document.cookie = name + "=" + value +";" +expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/***************************************************/