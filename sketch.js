const MAX_TIME = 300;

let state = 'menu'; 
let screen;
let myFont;
let niveau = 1;
let nombres = [];
let bubbles = [];
let emptySquare=[];
let opSquare =  [];
let operations = [];
let throwingSquare = [];
let particleList = [];
let resultat;

let message='';
let alpha = 0;

let time;
let to;

let score = 0;
let b1, b2, b3, checkButton;

function preload() {
	screen = createGraphics(400, 600);
	screen.background(5, 0, 12);
    myFont = loadFont('assets/bountifl.ttf');
    for (let i = 0; i < 600; i++) {
		randomChord(0.5 * screen.height, 1.2 * screen.width);
	}
}


function setup() {
	createCanvas(400,600);
	background(5, 0, 12);
	b1 = new Button(width * 0.55, height / 2, '1', true);
	b2 = new Button(width * 0.72, height / 2, '2', false);
	b3 = new Button(width * 0.89, height / 2, '3', false);
	bGo = new Button(width * 0.5, 0.8 * height, 'Go', false);
	checkButton = new Button(width * 0.5, 0.9 * height, 'Ok', false);

	
}

function init(n) {
	nombres = [];
	bubbles = [];
	emptySquare=[];
	opSquare =  [];
	operations = [];
	throwingSquare = [];
	particleList = [];

	listOfOp = ['+', '-', '*'];
	let nbr;
	switch(n) {
		case 1:
			nbr = 3;
			for (let i = 0; i < nbr - 1; i++) {
				operations.push(listOfOp[round(random(0,1))]);
			}
			opSquare.push(new Square(width * 0.4,height * 0.8,'+'));
			opSquare.push(new Square(width * 0.6, height * 0.8,'-'));
			generateNumbers(nbr);
			resultat = new Bubble(width /2, 0.5 * height, eval(nombres[0] + operations[0] + nombres[1] + operations[1] + nombres[2]) );			
			break;
		case 2:
			nbr = 4;
			for (let i = 0; i < nbr - 1; i++) {
				operations.push(listOfOp[round(random(0,1))]);
			}
			opSquare.push(new Square(width * 0.4,height * 0.8,'+'));
			opSquare.push(new Square(width * 0.6, height * 0.8,'-'));
			generateNumbers(nbr);
			resultat = new Bubble(width /2, 0.5 * height, eval(nombres[0] + operations[0] + nombres[1] + operations[1] + nombres[2] + operations[2] + nombres[3]) );

			break;
		case 3:
			nbr = 4;
			for (let i = 0; i < nbr - 2; i++) {
				operations.push(listOfOp[round(random(0,1))]);
			}
			operations.push('*');
			operations = shuffle(operations);
			opSquare.push(new Square(width * 0.4,height * 0.8,'+'));
			opSquare.push(new Square(width * 0.6, height * 0.8,'-'));
			opSquare.push(new Square(width * 0.5, height * 0.8, 'x'));
			generateNumbers(nbr);
			resultat = new Bubble(width /2, 0.5 * height, eval(nombres[0] + operations[0] + nombres[1] + operations[1] + nombres[2] + operations[2] + nombres[3]) );

			break;
	}

	let marge = 10;
	let step = (width - 2 * marge) / (2*nbr - 1);
	for (let i = 0; i < 2 * nbr - 1; i++) {
		if (i%2 == 0) {
			bubbles.push(new Bubble(marge + 0.5 * step + step * i, height * 0.25, nombres[i/2]));
		}
		else {
			emptySquare.push(new EmptySquare(marge + 0.5 * step + step * i, height * 0.25));
		}
	}
	emptySquare[0].clicked = true; // init the first
	resultat.r = 45;
	resultat.color = color(250,150,150,200);
}

function generateNumbers(nbr) {
	for (let i = 0; i < nbr; i++) {
		
		let number = round(random(-10,10));
		let val;
		if (number < 0) {
			val = new String('(' + number + ')')
			nombres.push(val);
		} else {
			val = new String(number)
			nombres.push(val);
		}
	}
}

function draw() {
	image(screen, 0,0);
  	switch(state) {
		case 'menu':
			textFont(myFont);
			textAlign(CENTER, CENTER);
			textSize(36);
			fill(255);
			text("Tout est relatif II", width / 2, 20);
			textAlign(LEFT, CENTER);
			text("NIVEAU", 12, height / 2);
			b1.update();
			b2.update();
			b3.update();
			bGo.update();
			fill(255);
			textSize(24);
			textAlign(CENTER, CENTER);
			text("Compléter les calculs avec\nles bonnes opérations pour\naboutir au résultat.\nVous avez 3 minutes", width / 2, 0.25 * height);
			if (bGo.clicked) {
				state = 'game';
				to = round(millis() / 1000);
				init(niveau);
			}
			break;
		case 'game':
			
				

			fill(255);
			textFont(myFont);
			textSize(24);
			textAlign(LEFT, CENTER);
			time = round(millis() / 1000) - to;

			text(MAX_TIME - time, 10,10);
			textSize(24);
			fill(255);
			textAlign(RIGHT, CENTER);
			text("Score : " + score, width - 10, 10);
			for (let bub of bubbles) {
				bub.show();
			}
			for (let sqar of emptySquare) {
				sqar.show();
			}
			opSquare[0].show();
			opSquare[1].show();
			checkButton.update();
			if (niveau == 3) {opSquare[2].show();}
			resultat.show();

			// Animations
			for (let part of particleList) {
				part.update(1/60);
				part.show();
			}

			for( let i = 0; i < throwingSquare.length; i++) {
				throwingSquare[i].move();
				for (let j = 0; j < 4; j++) {
					particleList.push(new Particle(throwingSquare[i].pos.x, throwingSquare[i].pos.y, random(90,110), random(- PI, 0)));
				}
				throwingSquare[i].show(); 

				// rhowingSquare Clean'up
				if (throwingSquare[i].speed == 0) {
					emptySquare[throwingSquare[i].id].val = throwingSquare[i].val;
					throwingSquare.splice(i,1);
				}
			}
			// particle clean'up
			for (let i = 0; i < particleList.length; i++) {
				if (!particleList[i].active) { 
					particleList.splice(i,1);
				}
			}

			if (message != '') {
				alpha +=3;
				let x = width/2;
				let y = height/2;
				fill(250,50,50, 255 - alpha);
				noStroke();
				ellipse(x,y,200,80);
				ellipse(x,y-55, 30,30);
				ellipse(x,y+55, 30,30);
				fill(255,255,255,255 - alpha);
				textAlign(CENTER,CENTER);
				textSize(36);
				text(message, x, y-10);
				if (alpha > 255) {
					message = '';
					alpha = 0;
				}
			}

			if (time >= MAX_TIME) {state = 'fin';}
			break;
		case 'fin':
			break;
  	}
}

function mouseClicked() {
	switch(state) {
		case 'menu':
			if (b1.over) {
				b1.clicked = true;
				b2.clicked = false;
				b3.clicked = false;
				niveau = 1;
			} else if (b2.over) {
				b2.clicked = true;
				b1.clicked = false;
				b3.clicked = false;
				niveau = 2;
			} else if (b3.over) {
				b3.clicked = true;
				b1.clicked = false;
				b2.clicked = false;
				niveau = 3;
			} else if(bGo.over) {
				bGo.click();
			}
			break;
		case 'game':
			for (let i = 0; i < emptySquare.length; i++) {
				if (emptySquare[i].isOver()) {
					for(let sq of emptySquare) {sq.clicked = false;}
					emptySquare[i].clicked = true;
				}
			}
			for(let op of opSquare) {
				if(op.isOver()) {	
					for(let i=0; i < emptySquare.length; i++) {
						if (emptySquare[i].clicked) {
							throwSquare(op, emptySquare[i], i);
						}
					}
				}
			}

			if (checkButton.over) {
				let nbrFilled = 0
				for (let empty of emptySquare) {
					if (empty.val != "") {nbrFilled += 1;}
				}
				if (emptySquare.length == nbrFilled) {
					let answer = "";
					for (let i = 0; i < emptySquare.length; i++) {
						answer += bubbles[i].val + emptySquare[i].val;
					}
					answer+=bubbles[emptySquare.length].val;
					if (resultat.val == eval(answer)) {
						score +=1;
						message = flashMessage(true);
						init(niveau);
					} else {
						message = flashMessage(false);
					}
				}
				
			}
			break;
		case 'end':
			break;
	}
}

function throwSquare(s, e, i) {
	let t = new Square(s.pos.x, s.pos.y, s.val);
	t.speed.set(e.pos.x - s.pos.x, e.pos.y - s.pos.y);
	t.speed.setMag(7);
	t.id = i;
	t.destination = e.pos.y;
	throwingSquare.push(t);
}

function randomChord(x,y) {
    // find a random point on a circle
    let angle1 = random(0, 2 * PI);
    let xpos1 = x + y * cos(angle1);
    let ypos1 = x + y * sin(angle1);

    // find another random point on the circle
    let angle2 = random(0, 2 * PI);
    let xpos2 = x + y * cos(angle2);
    let ypos2 = x + y * sin(angle2);

    // draw a line between them
    screen.stroke(255, 255, 255, 15);
    screen.line(xpos1, ypos1, xpos2, ypos2);
} 

function flashMessage(juste) {
	let errorMessage = ["Non", "Dommage", "Raté", "Bof !", "Oups", "Aïe"];
	let rightMessage = ["Oui", "Très bien", "Juste", "D'accord", "Bien joué", "Good Job", "Nice"]
	if (juste) {
		return rightMessage[round(random(0,rightMessage.length - 1))];
	} else {
		return errorMessage[round(random(0, errorMessage.length - 1))];
	}
}
