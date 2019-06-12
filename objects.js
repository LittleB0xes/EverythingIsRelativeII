class Button {
    constructor(x,y, text, state) {
        this.x = x;
        this.y = y;
        this.clicked = state;
        this.over = false;
		this.r = 30;
        this.color = color(150,150,250,200);
        this.colorOver = color(100,100,200,200);
		this.colorClicked =  color(250,150,150, 200);
        this.text = text;
        this.off = random(1,100);
    }
    
    update(){
        this.isOver();
        this.show();
    }

    isOver() {
        let x = mouseX;
        let y = mouseY;
        if (dist(x, y, this.x, this.y) <= this.r) {
            this.over = true;
        } else {
            this.over = false;
        }
    }

    click() {
        this.clicked ? this.clicked = false : this.clicked = true;
    }

    show() {
        if (this.clicked) {
            fill(this.colorClicked);
        } else if (this.over) {
            fill(this.colorOver);
        } else {
            fill(this.color);
		}
		noStroke();let noiseX =  noise(this.x + this.off) * 5;
        let noiseY = noise(this.y + this.off) * 5;
        this.off +=0.01
        ellipse(this.x + noiseX, this.y + noiseY, this.r * 2);
		fill(0);
		textSize(36);
		textAlign(CENTER, CENTER);
		text(this.text, this.x + noiseX, this.y + noiseY);
    }
}

class Bubble {
    constructor(x, y, val = "") {
        this.x = x;
        this.y = y;
        this.val = val;
        this.r = random(25,30);
        this.clicked = false;
        this.over = false;
        this.off = random(1,100);
        this.color = color(150,150,250,200);
    }

    show() {
        fill(this.color);
        noStroke();
        let noiseX =  noise(this.x + this.off) * 5;
        let noiseY = noise(this.y + this.off) * 5;
        this.off +=0.01
        ellipse(this.x + noiseX, this.y + noiseY, this.r * 2);
        textSize(32);
        textFont(myFont);
        textAlign(CENTER, CENTER);
        fill(20);
        text(this.val, this.x +noiseX, this.y - 5 + noiseY);

    }
}

class Square {
    constructor(x ,y ,val ) {
        this.pos = createVector(x,y);
        this.w = 30;
        this.val = val;
        this.clicked = state;
        this.speed = createVector(0,0);
        this.destination = 0;
    }

    show() {
        fill(250,150,150,100);
        rect(this.pos.x, this.pos.y, this.w, this.w,5,5,5,5);
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.val, this.pos.x, this.pos.y-5);
    }

    move() {
        //this.pos = p5.Vector.add(this.pos, this.speed.mult(1/60));
        if (this.pos.y > this.destination) {
            this.pos.add(this.speed);
        } else {this.speed = 0;}
    }

    isOver() {
        if (mouseX > this.pos.x - 0.5 * this.w && mouseX < this.pos.x + this.w && mouseY > this.pos.y - this.w && mouseY < this.pos.y + this.w) {
            return true;
        }
        return false;
    }
}

class EmptySquare {
    constructor(x, y, val = "") {
        this.x = x;
        this.y = y;
        this.pos = createVector(x, y);
        this.w = 30;
        this.val = val; 
        this.clicked = false;
        this.id = 0;
    }
    show() {
        rectMode(CENTER);
        if (this.clicked && second() % 2 == 0) {
            fill(150,150,250,200);
        } else {
            fill(150,150,250,100);
        }
        rect(this.pos.x, this.pos.y, this.w, this.w, 5, 5, 5 ,5);
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.val, this.pos.x, this.pos.y-5);
    }
    isOver() {
        if (mouseX > this.pos.x - 0.5 * this.w && mouseX < this.pos.x + this.w && mouseY > this.pos.y - this.w && mouseY < this.pos.y + this.w) {
            return true;
        }
        return false;
    }
}

class Particle {
	constructor(x,y, speed, theta) {
		this.pos = createVector(x,y);
		this.speed = createVector(speed * cos(theta), speed * sin(theta));
		this.acc = createVector(0,300) // Gravity
		this.radius = random(2,4);
		this.active = true;
	}

    update(t) {
		this.speed.add(p5.Vector.mult(this.acc, t));
		this.pos.add(p5.Vector.mult(this.speed, t));
		if (this.pos.y >  height) {
			this.active = false;
		}
	}

	show() {
		noStroke();
		fill(255,255 * random(0.5,1),20);
		ellipse(this.pos.x, this.pos.y, this.radius*2 + random(-1,1));
	}
}
