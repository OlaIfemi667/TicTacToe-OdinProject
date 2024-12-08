function createBoard(size=3){
    const container = document.querySelector("#board")
    for (let i = 0; i < size; i++)
    {
        let sizeX = size;
        const divSize = 150;
        for (let j = 0; j < sizeX; j++)
        {
            let aDiv = document.createElement("div");
            aDiv.setAttribute("class", "grid neonText");
            aDiv.style.border = "1px solid green";
            
            aDiv.style.width = `${divSize}px`;
            aDiv.style.height = `${divSize}px`;
            container.appendChild(aDiv);
        }
    }
    console.log("divs created")
}

function addClickEvent(player1, player2)
{
    let dialog = document.querySelector("dialog");
    let actualPattern = [];
    const containerChild = document.querySelectorAll(".grid");
    containerChild.forEach((element,index) => {
        element.addEventListener("click", () => {
            if(element.textContent == '')
            {
                if(player1.getTurn())
                {
                    element.textContent = `${player1.marker}`;
                    player1.switchTurn();
                    player2.switchTurn();
                    actualPattern = getActualPattern();
                    let actualWinninPattern = getWinningPattern(actualPattern);
                    let player1Winning = getWinningPattern(player1.pattern());
                    console.log(player1Winning)
                    console.log(actualWinninPattern);

                    if(Won(actualWinninPattern, player1Winning))
                    {
                        dialog.textContent = "Player 1 won";
                        dialog.show();
                        restart();
                    }
                    else
                    {
                        console.log("no 1");
                        console.log(Won(actualWinninPattern, player1Winning))
                    }

                }
                else if(player2.getTurn())
                {
                    element.textContent = `${player2.marker}`;
                    player1.switchTurn();
                    player2.switchTurn();
                    actualPattern = getActualPattern();
                    let actualWinninPattern = getWinningPattern(actualPattern);
                    let player2Winning = getWinningPattern(player2.pattern());
                    console.log(player2Winning);
                    console.log(actualWinninPattern);
                    if(Won(actualWinninPattern, player2Winning))
                    {
                        dialog.textContent = "Player 2 won";
                        dialog.show();
                        restart();
                    }
                    else
                    {
                        console.log("no 2");
                        console.log(Won(actualWinninPattern, player2Winning))
                    }
                }
            }
            console.log(`player1 ${player1.getTurn()} player2 ${player2.getTurn()}`);
        })
        
    });
    const start = document.querySelector('#start');
    start.addEventListener("click",() => {
        restart(player1, player2);
    })
    console.log("Hover applied")

}

function createPlayer(name,marker){
    let score = 0;
    let myturn = true;
    const getScore = () => score;
    const getTurn = () => myturn;
    const increaseScore = () => score++;
    const switchTurn = () => myturn = !myturn;
    const setTurn = (turn) => myturn = turn;
    const pattern = () => [marker, marker, marker, marker, marker, marker, marker, marker, marker];
    return {name, marker, getScore, increaseScore, getTurn, switchTurn, pattern, setTurn};
}
function getWinningPattern(actualPattern){
    const winningPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const board = document.querySelector("#board");
    
    const result = winningPatterns.map(pattern => 
        pattern.map(index => actualPattern[index])
      );
    return result;
}
function getActualPattern(){
    let actualPattern = [];
    const boardGrid = document.querySelectorAll(".grid");
    boardGrid.forEach(element => {
        actualPattern.push(element.textContent);
    }); 
    return actualPattern;
}
function Won(actualPattern, winningPatterns) {
    let status = false;
    
    for(let i = 0; i < actualPattern.length; i++)
    {
        for(let j = 0; j < winningPatterns.length; j++)
        {
            console.log(actualPattern[i]);
            console.log(winningPatterns[i])
            if(JSON.stringify(actualPattern[i]) === JSON.stringify(winningPatterns[j])){
                status = true;
                break;
            }
        }
        if(status)
            break;
    }
    return status;
}

function restart(player1, player2){
    let dialog = document.querySelector("dialog");
    const containerChild = document.querySelectorAll(".grid");
    containerChild.forEach(element => {
        element.textContent = "";
    });
    dialog.close();
    player1.setTurn(true);
    player2.setTurn(false);
}

function main () { 
    let player1 = createPlayer("Player1", "〇");
    let player2 = createPlayer("Player2", "⛌");
    
    player2.switchTurn();
    createBoard();
    addClickEvent(player1, player2);
}

main();