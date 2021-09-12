/**
 * grid datastructure class.  
 */

class Grid{
	constructor(rows, cols, cellSize, data=null){
		this._rows = rows;
		this._cols = cols;
		this._cellSize = cellSize;
		this._grid = this._makeGrid(rows, cols, data);
	}

	//private methods

	_makeGrid(rows, cols, data){
		let i, j, grid, temp;
		grid=[];
		for(i=0; i<rows; i++){
			temp = [];
			for(j=0; j<cols; j++){
				temp.push(new GridCell(data));
			}
			grid.push(temp);
			
		}

		return grid;
	}

	//public methods
	getGrid(){
		return this._grid;
	}

	getValue(row, col){
		const cell =  this._grid[row][col];
		return cell.getData();
	}

	setValue(row, col, data){
		const cell = this._grid[row][col];
		cell.setData(data);
	}

	getRows(){
		return this._rows;
	}

	getCols(){
		return this._cols;
	}

	getCells(){
		//returns an arry of all the cells
		let cells = [];
		this._grid.forEach(row=>{
			row.forEach(cell=>{
				cells.push(cell);
			});
		});

		return cells;
	}
}

class GridCell{
	constructor(data){
		this._data = data;
	}

	getData(){
		return this._data;
	}

	setData(data){
		this._data = data;
	}
}