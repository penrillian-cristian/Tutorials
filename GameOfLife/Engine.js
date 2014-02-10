/**
 * Created by cristian and filip on 06/02/14.
 */
var gridSize=20;
var delay=1000;
var timer;
var counter=0;

grid = [];
newGrid = [];
for(var i=0; i<gridSize; i++) {
    grid[i] = [];
    newGrid[i] = [];
    for(var j=0; j<gridSize; j++) {
        grid[i][j] = undefined;
        newGrid[i][j] = undefined;
    }
}

/*newGrid = [];
for(var i=0; i<gridSize; i++) {
    newGrid[i] = [];
    for(var j=0; j<gridSize; j++) {
        newGrid[i][j] = undefined;
    }
}*/


function gridPrompt()
{
    gridSize=prompt("Please enter desired grid size");

    for(var i=0; i<gridSize; i++) {
        grid[i] = [];
        newGrid[i] = [];
        for(var j=0; j<gridSize; j++) {
            grid[i][j] = undefined;
            newGrid[i][j] = undefined;
        }
    }

   /* for(var i=0; i<gridSize; i++) {
        newGrid[i] = [];
        for(var j=0; j<gridSize; j++) {
            newGrid[i][j] = undefined;
        }
    }*/
    reset();
}

function delayPrompt()
{
    delay=prompt("Please enter desired delay");
}

function gridSetup(gridParam){
    for(var i=0; i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            gridParam[i][j]= new cell(i,j,"dead");
        }
    }
}
function action(cell){
    /*store cell's state*/
    var state = cell.cellState;
    var posX = cell.posX;
    var posY = cell.posY;

    var liveNeighbours=countLiveNeighbours(posX, posY);

    /*based on state and #neighbour, decide new state*/
    if(state == "live"){
        //dies, as if caused by under-population
       if(liveNeighbours<2){
           state = "dead";
       }
       //dies, as if by overcrowding
        else if(liveNeighbours>3){
           state = "dead";
       }
}
    //cell is dead
    else{
       if(liveNeighbours == 3){
           state = "live";
       }
    }

    newGrid[posX][posY].cellState = state;

    return state;
}
function cell(posX,posY,cellState)
{
    this.posX=posX;
    this.posY=posY;
    this.cellState=cellState;
}

function countLiveNeighbours(posX,posY){

    var noNeighbours=0;
    /*check #live neighbours and store it*/
    for(var indexR=posX- 1, lengthR=indexR+3; indexR<lengthR; indexR++){
        for(var indexC=posY- 1, lengthC=indexC+3; indexC<lengthC; indexC++){
            /*count live neighbours; make sure not to count current cell and to stay within borders*/
            if(indexR>=0 && indexC>=0 && indexR<gridSize && indexC<gridSize){
                if(!(indexR== posX  && indexC==posY) && grid[indexR][indexC].cellState=="live"){
                    noNeighbours++;
                }
            }
        }
    }
    return noNeighbours;
}

function step(){
    counter++;
    var element = document.getElementById("Status");
    element.innerHTML ="Generation number:  " +counter;
    for(var i=0;i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            action(grid[i][j]);
        }
    }

    for(var i=0;i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            grid[i][j].cellState=newGrid[i][j].cellState;
        }
    }

    printGrid(grid);

}


function start()
{
       timer = setInterval(step,delay);
}

function stop()
{
    clearInterval(timer);
}



function printGrid(gridParam){
    var element = document.getElementById("Grid");
    element.innerHTML = '';
    for(var i=0;i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            if(grid[i][j].cellState=="dead"){
                element.innerHTML += "0 ";
            }
            else{
                element.innerHTML+="1 ";
            }

        }
        element.innerHTML +="<br>";
    }
    element.innerHTML +="<br>";
    element.innerHTML +="<br>";
}

function init(){
    gridSetup(grid);
    gridSetup(newGrid);
}

function reset(){
    counter=0;
    stop();
    init();
    printGrid(grid);
}

function images(){
    for(var i =0;i<gridSize;i++){
        for(var j =0;j<gridSize;j++){
            if(grid[i][j].cellState=="dead"){
                grid[i][j].cellState=0;
            }
            else{
                grid[i][j].cellState=1;
            }
        }
    }
}