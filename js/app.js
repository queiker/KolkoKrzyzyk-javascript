var gameMode = "X";
var results = [["","",""],["","",""],["","",""]];

// document.getElementById("btn_00").onclick = setButton;

function setButton(btn)
{
    btn.disabled = true;
    btn.value = gameMode;
    var rowAndColl = getRowAndColl(btn.id);
    
    results[rowAndColl[0]][rowAndColl[1]] = gameMode;

    gameMode = changeGameMode(gameMode);
    
    console.log(results);
    var currentResult = ifWin();
    console.log("ifWin: " + currentResult);
    if(currentResult)
    {
        document.getElementById("txtResult").append("Win");
        document.getElementById("txtResult").text = "test";
        changeAllButtons(true, false);
    }

}

function changeAllButtons(disabled, cleanValue)
{
    var row;
    var ifWin = false;

    for(row = 0; row < 3; row++)
    {
        var coll
        for(coll = 0; coll < 3; coll++)
            {
                var btn = document.getElementById("btn_" + row + coll);
                btn.disabled = disabled;

                if(cleanValue)
                    btn.value = "";
            }
    }

}

function reset()
{
    changeAllButtons(false, true);
    results = [["","",""],["","",""],["","",""]];
    document.getElementById("txtResult").innerText = "";
}

function changeGameMode(gameMode)
{
    if(gameMode === "X")
        {
            gameMode = "O";
        }
    else
        {
            gameMode = "X";
        }
    return gameMode;
}

function getRowAndColl(btn_id)
{
    var rowAndColl = [0,0];

    rowAndColl[0] = parseInt(btn_id[4]);
    rowAndColl[1] = parseInt(btn_id[5]);
    return rowAndColl;

}
function ifWin()
{
    var row;
    var ifWin = false;

    for(row = 0; row < 3; row++)
    {
        var coll
        for(coll = 0; coll < 3; coll++)
            {
                ifWin = checkOther(row,coll);
                if(ifWin)
                    return ifWin;
            }
    }
    return ifWin;
}

function checkOther(row,coll)
{
    console.log("checkOther")
    if(coll == 1 && results[row][coll] != "")
    {
        console.log(results[row][coll - 1]);
        console.log(results[row][coll]);
        console.log(results[row][coll + 1]);
        console.log(coll + ";" + row);
        console.log(results[row][coll - 1] === results[row][coll]);

        if(results[row][coll - 1] === results[row][coll] && results[row][coll + 1] === results[row][coll])
            return true;
    }

    if(row == 1 && results[row][coll] != "")
    {
        if(results[row-1][coll] === results[row][coll] && results[row + 1][coll] === results[row][coll])
            return true;
    }

    if(row == 1 && coll == 1 && results[row][coll] != "")
    {
        if((results[row-1][coll-1] === results[row][coll] && results[row + 1][coll + 1] === results[row][coll])
        || (results[row + 1][coll-1] === results[row][coll] && results[row - 1][coll + 1] === results[row][coll]))
            return true;
    }


    return false;

}