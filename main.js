
//general variables
var backgroundColor = "#232323";
var headerColor = "steelblue";
var colorList = [];
var numSquares;  

//elements to manipulate
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.getElementById("resetBtn");
var modeBtns = document.querySelectorAll(".mode");



//initialize game
init();

function init(){

	numSquares = 6; 
	
	setUpButtons();
	setUpSquares();
	renderUI();
}


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
				messageDisplay.textContent = "Correct!";
				changeToWinningColor(clickedColor);
				resetBtn.textContent = "Play again?";
			}else{
				//lose
				this.style.background =  backgroundColor; 
				messageDisplay.textContent = "Try again!";
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
		renderUI();
	});
}

function renderUI () {
	//generate new colors
	colorList = generategetRandomColorsArray(numSquares);	
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

//picls the single correct color randomly from colors array
function pickCorrectColor () {
	var random = Math.floor(Math.random() * colorList.length);
	return colorList[random];
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

function generategetRandomColorsArray (num) {

	var arr = [];
	//add num random colors to the array
	for(var i = 0; i<num; i++){
		arr.push(getRandomColor());
	}
	
	return arr; 
}

function changeToWinningColor (color) {
	//loop all squares to change each color
	for(var i = 0; i<colorList.length; i++){
		squares[i].style.background = color; 
	}
	h1.style.background = color; 
}
