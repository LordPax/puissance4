let canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	width = window.innerWidth,
	height = window.innerHeight,
	ratio = window.devicePixelRatio;

canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';
ctx.scale(ratio, ratio);

let img = new Image();

let piece = [];
let p = 0, p2 = 0;
let tx = 60, ty = 60;
let nby = 6, nbx = 7;
let carx = width / 2 - nbx * tx / 2, cary = height / 2 - nby * ty / 2;
let posx = 0, posy = 0, team = 0;
let t = 0, t1 = 0;

for(let p = 0; p < nbx * nby; p++){
	piece.push(new Piece());
}

function in_array(truc, tab){
	for (var i = 0; i < tab.length; i++) {
		if(truc == tab[i])
			return true;
	}
	return false;
}

function trouve(x, y){
	for(i = 0; i < piece.lenth; i++)
		if(piece[i].x == x && piece.y == y)
			return i;
}

function Piece(){
	//this.py = z;
	this.creePiece = (x, y, px, py, team) => {
		this.team = team;
		this.r = 25;
		this.x = x + this.r + 5;
		this.y = y + this.r + 5;
		this.px = px;
		this.py = py;
	}

	this.updateP = () => {
		if(this.team == 0)
			ctx.fillStyle = '#F7FE2E';
		else if(this.team == 1)
			ctx.fillStyle = '#FE2E2E';

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fill();
	}

	this.gagnantP = (i) => {
		/*for (let i = 0; i < piece.length; i++) {
			piece[i]
			if(piece[i].py == 0){

			}
		}*/
		let x = 0, y = 0;
		let id = [];
		let team = piece[i].team;
		for(j = 0; j < 4 && piece[i].team == team; j++){
			x = piece[i].x + j;
			y = piece[i];
			id.push(trouve(x, y));
			
			team = piece[id[j]].team;
		}
		if(j == 4)
			alert('bravo !!!');
		else
			alert('test !!!');

		
	}
}

function Map(x, y, tx, ty, nbx, nby){
	this.x = x;
	this.y = y;
	this.tx = tx;
	this.ty = ty;
	this.nbx = nbx;
	this.nby = nby;
	this.r = 25

	this.x3 = x;
	this.y3 = y - this.ty - 10;
	
	this.creeMap = () => {
		for (let i = 0; i < nby; i++) {
			for (let j = 0; j < nbx; j++) {
				ctx.fillStyle = '#2E64FE';
				ctx.fillRect(this.x, this.y, this.tx, this.ty);
				ctx.fillStyle = '#FFF';
				ctx.beginPath();
				ctx.arc(this.x + this.tx / 2, this.y + this.ty / 2, this.r, 0, 2*Math.PI);
				ctx.fill();
				// ctx.font = '10px sans-serif';
				// ctx.fillStyle = '#000';
				// ctx.fillText(j + ';' + i, this.x + this.tx - 20, this.y + this.ty - 10);
				this.x += this.tx;
			}
			this.x = x;
			this.y += this.ty;
		}
		this.y = y;
	}

	this.piece = (px) => {
		this.px = px;
		this.py = 5;

		this.x2 = x;
		this.y2 = y;

		for (let j = 0; j < this.px; j++) {
			this.x2 += this.tx;
		}

		for (let i = 0; i < this.py; i++) {
			this.y2 += this.ty;
		}
		
		for (let i = 0; i < piece.length; i++) {
			if(piece[i].py == 5 && piece[i].px == this.px){
				this.py = 4;
				this.y2 -= this.ty;
			}
			else if(piece[i].py == 4 && piece[i].px == this.px){
				this.py = 3;
				this.y2 -= this.ty;
			}
			else if(piece[i].py == 3 && piece[i].px == this.px){
				this.py = 2;
				this.y2 -= this.ty;
			}
			else if(piece[i].py == 2 && piece[i].px == this.px){
				this.py = 1;
				this.y2 -= this.ty;
			}
			else if(piece[i].py == 1 && piece[i].px == this.px){
				this.py = 0;
				this.y2 -= this.ty;
			}
			else if(piece[i].py == 0 && piece[i].px == this.px){
				this.py = -1;
			}
		}

		if(this.py != -1){
			if(p2 % 2 == 0)
				team = 0;
			else
				team = 1;
		
			piece[p2].creePiece(this.x2, this.y2, this.px, this.py, team);
			p2++;
		}
		
		this.gagnant();
	}

	this.touche = () => {
		if(p2 % 2 == 0)
			img.src = 'images/fleche_J.png';
		else
			img.src = 'images/fleche_R.png';

		for (let i = 0; i < nbx; i++) {
			ctx.drawImage(img, this.x3, this.y3, this.tx, this.ty);
			this.x3 += tx;
		}
		this.x3 = x;
	}

	this.updatePiece = () => {
		for (let i = 0; i < piece.length; i++)
			piece[i].updateP();
	}

	this.gagnant = () => {
		/*for (let i = 0; i < piece.length; i++) {
			if(piece[i].py == 5 && piece[i].team == 0){
				t++;
				if(t == 4)
					alert('test jaune');
			}
		}
		
		t = 0;
		t1 = 0;*/
		for(i = 0; i < piece.lenth; i++){
			piece[i].gagnantP(i);
		}	
	}
}

map = new Map(carx, cary + 30, tx, ty, nbx, nby);

addEventListener('click', function(e){
	if(e.clientY >= map.y3 && e.clientY <= map.y3 + ty){
		if(e.clientX >= map.x3 && e.clientX <= map.x3 + tx)
			map.piece(0);
		else if(e.clientX >= map.x3 + tx && e.clientX <= map.x3 + 2 * tx)
			map.piece(1);
		else if(e.clientX >= map.x3 + 2 * tx && e.clientX <= map.x3 + 3 * tx)
			map.piece(2);
		else if(e.clientX >= map.x3 + 3 * tx && e.clientX <= map.x3 + 4 * tx)
			map.piece(3);
		else if(e.clientX >= map.x3 + 4 * tx && e.clientX <= map.x3 + 5 * tx)
			map.piece(4);
		else if(e.clientX >= map.x3 + 5 * tx && e.clientX <= map.x3 + 6 * tx)
			map.piece(5);
		else if(e.clientX >= map.x3 + 6 * tx && e.clientX <= map.x3 + 7 * tx)
			map.piece(6);
	}
});

function draw(){
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = '#F7FE2E';
	ctx.font = '60px sans-serif';
	ctx.fillStyle = '#FE2E2E';
	ctx.fillText('Puissance 4', carx + 20, cary - 90);
	// ctx.strokeStyle = '#F7FE2E';
	// ctx.strokeText('Puissance 4', carx + 20, cary - 90);
	map.creeMap();
	map.touche();
}

function update(){
	map.updatePiece();
	//map.gagnant();
}

function animation(){
	draw();
	update();
	requestAnimationFrame(animation);
}

animation();
