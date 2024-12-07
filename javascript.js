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
    const containerChild = document.querySelectorAll(".grid")
    containerChild.forEach((element,index) => {
        element.addEventListener("click", () => {
            if(element.textContent == '')
            {
                if(player1.getTurn())
                    {
                        element.textContent = `${player1.marker}`;
                        player1.switchTurn();
                        player2.switchTurn();
                    }
                    else if(player2.getTurn())
                    {
                        element.textContent = `${player2.marker}`;
                        player1.switchTurn();
                        player2.switchTurn();
                    }
            }
            console.log(`player1 ${player1.getTurn()} player2 ${player2.getTurn()}`)
        })
        
    });
    console.log("Hover applied")

}

function createPlayer(name,marker){
    let score = 0;
    let myturn = true;
    const getScore = () => score;
    const getTurn = () => myturn;
    const increaseScore = () => score++;
    const switchTurn = () => myturn = !myturn;
    return {name, marker, getScore, increaseScore, getTurn, switchTurn};
}
function getWinningPattern(){

}
function iWon(player1){
    const horizontal = "";

}
function main () {
    player1 = createPlayer("Player1", "〇");
    player2 = createPlayer("Player2", "⛌");
    player2.switchTurn();
    
    createBoard();
    addClickEvent(player1, player2);
    
}

main();