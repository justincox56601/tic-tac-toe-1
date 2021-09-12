
const grid = new Grid(10, 10, 3, 0);


class TictacToe extends Grid{
	constructor(){
		super(3, 3, 0);
		this._player = 'X';
	}

	drawBoard(element, width, height){
		let container = document.createElement('div');
		container.style.width = width + 'px';
		container.style.height = height + 'px';
		container.style.backgroundColor = 'pink';

		let row, col;
		for(row=0; row < super.getRows(); row++){
			let r = document.createElement('div');
			r.style.display = 'flex';
			for(col=0; col< super.getCols(); col++){
				let c = document.createElement('div');
				c.id = parseInt(row.toString() + col.toString());
				c.classList.add('game-cell');
				c.style.display = 'flex';
				c.style.justifyContent = 'center';
				c.style.alignItems = 'center';
				c.style.width = (width / 3) + 'px';
				c.style.height = (height / 3) + 'px';
				c.style.backgroundColor = ((row + col) % 2 == 0)? '#f1f1f1' : '#aeaeae';
				c.setAttribute('row', row);
				c.setAttribute('col', col);
				r.appendChild(c);
			}
			container.appendChild(r);
		}
		
		element.appendChild(container);
	}

	checkWinner(player){
		const checks = [
			this._checkDiag(player), this._checkCols(player), this._checkRows(player),
		];

		let winner = false;
		checks.forEach(c=>{
			if(c != false){
				winner = c;
			}
		});
		return winner;
	}

	switchPlayer(){
		this._player = (this._player == 'X')? 'O' : 'X';
	}

	getPlayer(){
		return this._player;
	}


	_checkRows(player){
		let r, c;
		let result = {
			check : 0,
			cells: [],
		};
		for(r=0; r<this.getRows(); r++){
			result.check = 0;
			for(c=0; c<this.getCols(); c++){
				if(this.getValue(r, c) == player){
					result.check ++;
					result.cells.push(parseInt(r.toString() + c.toString()));
				}
			}

			if(result.check == 3){return result}
			result.check = 0;
			result.cells = [];
		}
		return false;
	}

	_checkCols(player){
		let r, c;
		let result = {
			check : 0,
			cells: [],
		};
		for(c=0; c<this.getCols(); c++){
			let check = 0;
			for(r=0; r<this.getRows(); r++){
				if(this.getValue(r, c) == player){
					result.check ++;
					result.cells.push(parseInt(r.toString() + c.toString()));
				}
			}

			if(result.check == 3){return result}
			result.check = 0;
			result.cells = [];
		}
		return false;
	}

	_checkDiag(player){
		const diags = [
			[{r:0, c:0}, {r:1, c:1}, {r:2, c:2}],
			[{r:2, c:0}, {r:1, c:1}, {r:0, c:2}],
		];
		let result = {
			check : 0,
			cells: [],
		};

		let i, j;
		let winner = false
		for(i = 0; i< diags.length; i++){
			for(j=0; j<diags[i].length; j++){
				if(this.getValue(diags[i][j].r, diags[i][j].c) == player){
					result.check++;
					result.cells.push(parseInt(diags[i][j].r.toString() + diags[i][j].c.toString()));
				}
			}
			if(result.check == 3){
				return result;
			}
			result.check = 0;
			result.cells = [];
			
		}
		

		return false;
	}
}

const game = new TictacToe();
const container= document.querySelector('.container');
game.drawBoard(container, 600, 600);


let cells = document.querySelectorAll('.game-cell');
cells.forEach(c=>{
	c.addEventListener('click', clickEvent, c);
})

function clickEvent(event){
	const c = event.target;
	c.removeEventListener('click', clickEvent);
	let row = c.getAttribute('row');
	let col = c.getAttribute('col');
	const player = game.getPlayer();
	game.setValue(row, col, player);
	c.innerHTML = '<p>' + player + '</p>';

	let winner = game.checkWinner(player);
	if( winner!= false){
		gameOver();
		winner.cells.forEach(elem =>{
			document.getElementById(elem).style.backgroundColor = '#FFB6C1';
		});
		
	}

	game.switchPlayer();
	
}

function gameOver(){
	let cells = document.querySelectorAll('.game-cell');
	cells.forEach(c=>{
		c.removeEventListener('click', clickEvent);
	});
}