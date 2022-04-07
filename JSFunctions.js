"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {
    
};


window.addEventListener("load", oGameData.initGlobalObject);
window.addEventListener("load", addClass);
window.addEventListener("load", createCheckBox);


/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */

oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

    document.querySelector("table").addEventListener("click", executeMove);
    
}

document.getElementById("newGame").addEventListener("click", validateForm);
document.getElementById("newGame").addEventListener("click", tajmer);

function addClass() {
    let element = document.getElementById("gameArea");
    element.classList.add("d-none");
}
function validateForm() {
    
    let fel = document.getElementById("errorMsg");
    let nickName1 = document.getElementById("nick1");
    let nickName2 = document.getElementById("nick2");
    let colorP1 = document.getElementById("color1");
    let colorP2 = document.getElementById("color2");
    let white = '#ffffff';
    let black = '#000000';
    try {
        if(nickName1.value === nickName2.value) throw "Samma namn";
        if(nickName1.value.length < 4) throw "Namn måste vara 5 eller fler tecken";
        if(nickName2.value.length < 4) throw "Namn måste vara 5 eller fler tecken";
        if(colorP1.value === colorP2.value) throw "Måste vara olika färger";
        if(colorP1.value === white || colorP2.value === white) throw "Kan inte vara vit";
        if(colorP1.value === black || colorP2.value === black) throw "Kan inte vara svart";
        initiateGame();
    }catch(err) {
        fel.textContent = err;
    }
}
function initiateGame() {
    let formular = document.getElementById("divInForm");
    let spelplan = document.getElementById("gameArea");
    spelplan.classList.remove("d-none");
    formular.classList.add("d-none");
    let fel = document.getElementById("errorMsg");
    fel.textContent = "";
    oGameData.nickNamePlayerOne = document.getElementById("nick1").value; 
    oGameData.nickNamePlayerTwo = document.getElementById("nick2").value;
    oGameData.colorPlayerOne = document.getElementById("color1").value;
    oGameData.colorPlayerTwo = document.getElementById("color2").value;
    console.log(oGameData.nickNamePlayerOne);
    console.log(oGameData.nickNamePlayerTwo);
    console.log(oGameData.colorPlayerOne);
    console.log(oGameData.colorPlayerTwo);
    let planLista = document.querySelectorAll('td');
    for(let i = 0; i < planLista.length; i++) { //Loopar igenom en lista av alla 'td' element och tar bort text plus sätter bakgrundsfärgen till vit
        planLista[i].textContent = "";
        planLista[i].style.backgroundColor = "white";
        console.log(planLista[i]);
    }
    let playerChar;
    let playerName;

    let random = Math.random();
    console.log(random);

    if(random < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
        
    }
    else {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
        
    }
    let jumbo = document.querySelector("h1"); //Tar det första h1 elementet i klassen jumbotron
    jumbo.textContent = "Aktuell spelare är "+ playerName + " " + oGameData.currentPlayer;
}
/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function() {
    function checkHorizontal() {
   if(oGameData.gameField[0] === 'X' && oGameData.gameField[1] === 'X' && oGameData.gameField[2] === 'X') {
    return 1;
   }
   else if(oGameData.gameField[3] === 'X' && oGameData.gameField[4] === 'X' && oGameData.gameField[5] === 'X') {
    return 1;
}
   else if(oGameData.gameField[6] === 'X' && oGameData.gameField[7] === 'X' && oGameData.gameField[8] === 'X') {
    return 1;
}
   else if(oGameData.gameField[0] === 'O' && oGameData.gameField[1] === 'O' && oGameData.gameField[2] === 'O') {
    return 2;
   }
   else if(oGameData.gameField[3] === 'O' && oGameData.gameField[4] === 'O' && oGameData.gameField[5] === 'O') {
    return 2;
}
   else if(oGameData.gameField[6] === 'O' && oGameData.gameField[7] === 'O' && oGameData.gameField[8] === 'O') {
    return 2;
}
   else {
    return 0;
   }
};
function checkVertical() {
    if(oGameData.gameField[0] === 'X' && oGameData.gameField[3] === 'X' && oGameData.gameField[6] === 'X') {
     return 1;
    }
    else if(oGameData.gameField[1] === 'X' && oGameData.gameField[4] === 'X' && oGameData.gameField[7] === 'X') {
     return 1;
 }
    else if(oGameData.gameField[2] === 'X' && oGameData.gameField[5] === 'X' && oGameData.gameField[8] === 'X') {
     return 1;
 }
    else if(oGameData.gameField[0] === 'O' && oGameData.gameField[3] === 'O' && oGameData.gameField[6] === 'O') {
     return 2;
    }
    else if(oGameData.gameField[1] === 'O' && oGameData.gameField[4] === 'O' && oGameData.gameField[7] === 'O') {
     return 2;
 }
    else if(oGameData.gameField[2] === 'O' && oGameData.gameField[5] === 'O' && oGameData.gameField[8] === 'O') {
     return 2;
 }
    else {
     return 0;
    }
 };
 function checkDiagonal() {
    if(oGameData.gameField[0] === 'X' && oGameData.gameField[4] === 'X' && oGameData.gameField[8] === 'X') {
     return 1;
    }
    else if(oGameData.gameField[2] === 'X' && oGameData.gameField[4] === 'X' && oGameData.gameField[6] === 'X') {
     return 1;
 }
    else if(oGameData.gameField[0] === 'O' && oGameData.gameField[4] === 'O' && oGameData.gameField[8] === 'O') {
     return 2;
    }
    else if(oGameData.gameField[2] === 'O' && oGameData.gameField[4] === 'O' && oGameData.gameField[6] === 'O') {
     return 2;
 }
    else {
     return 0;
    }
 };
let h = checkHorizontal();
let v = checkVertical();
let d = checkDiagonal();
 function checkWin() {
     if((h === 1 || v === 1 || d === 1) && (h !== 2 && v !== 2 && d !== 2)) {
         return 1;
     }
     else if((h === 2 || v === 2 || d === 2) && (h !== 1 && v !== 1 && d !== 1)) {
         return 2;
     }
     else if(h === 0 && v === 0 && d === 0) {
         return 3;
     }
     else {
         return 0;
     }
 }
return checkWin();
}
function executeMove() {
    let tdLista = document.querySelectorAll("td");
    endGame();
    for(let i = 0;i < tdLista.length;i++) {
        tdLista[i].addEventListener("click", function() {
            let tdContent = tdLista[i].getAttribute("data-id");
            if((oGameData.currentPlayer === oGameData.playerOne) && tdLista[i].textContent === "") {
                tdLista[i].textContent = oGameData.currentPlayer;
                oGameData.gameField[tdContent] = oGameData.currentPlayer;
                oGameData.currentPlayer = oGameData.playerTwo;
                tdLista[i].style.backgroundColor = oGameData.colorPlayerOne;
                let jumbo = document.querySelector("h1"); //Tar det första h1 elementet i klassen jumbotron
                jumbo.textContent = "Aktuell spelare är "+ oGameData.nickNamePlayerTwo + " " + oGameData.currentPlayer;
            }
            else if((oGameData.currentPlayer === oGameData.playerTwo) && tdLista[i].textContent === "") {
                tdLista[i].textContent = oGameData.currentPlayer;
                oGameData.gameField[tdContent] = oGameData.currentPlayer;
                oGameData.currentPlayer = oGameData.playerOne;
                tdLista[i].style.backgroundColor = oGameData.colorPlayerTwo;
                let jumbo = document.querySelector("h1"); //Tar det första h1 elementet i klassen jumbotron
                jumbo.textContent = "Aktuell spelare är "+ oGameData.nickNamePlayerOne + " " + oGameData.currentPlayer;
            }
        });
    }
    console.log(oGameData.checkForGameOver());
    clearInter();
}

function endGame() {
    //oGameData.checkForGameOver();
    if(oGameData.checkForGameOver() === 1) {
        document.querySelector("table").removeEventListener("click", executeMove);
        document.getElementById("gameArea").classList.add("d-none");
        document.getElementById("divInForm").classList.remove("d-none");
        let jumbo = document.querySelector("h1"); //Tar det första h1 elementet i klassen jumbotron
        jumbo.textContent = "Vinnaren är "+ oGameData.nickNamePlayerOne + " " + oGameData.playerOne + " Spela igen?";
        oGameData.initGlobalObject();
        //document.getElementById("tajmer").checked = false;
        //tajmer();
    }
    else if(oGameData.checkForGameOver() === 2) {
        document.querySelector("table").removeEventListener("click", executeMove);
        document.getElementById("divInForm").classList.remove("d-none");
        document.getElementById("gameArea").classList.add("d-none");
        let jumbo = document.querySelector("h1"); //Tar det första h1 elementet i klassen jumbotron
        jumbo.textContent = "Vinnaren är "+ oGameData.nickNamePlayerTwo + " " + oGameData.playerTwo + " Spela igen?";
        oGameData.initGlobalObject();
       // document.getElementById("tajmer").checked = false;
       // tajmer();
    }
    else if((oGameData.checkForGameOver() === 3) && oGameData.gameField.includes("") === false) { //Kollar om arrayen innehåller en tom ruta
        document.querySelector("table").removeEventListener("click", executeMove);
        document.getElementById("divInForm").classList.remove("d-none");
        document.getElementById("gameArea").classList.add("d-none");
        let jumbo = document.querySelector("h1"); //Tar det första h1 elementet i klassen jumbotron
        jumbo.textContent = "Oavgjort, Spela igen?";
        oGameData.initGlobalObject();
       // document.getElementById("tajmer").checked = false;
        //tajmer();
    }
}
//Skapar en tom variabel
var myTimer;
//Gör om variabeln till en timer om checkboxen är checkad
//Annars stoppar den timern
function tajmer() {
    if(document.getElementById("checkTimer").checked) 
        myTimer = setTimeout(switchPlayer, 3000);
    else
        clearTimeout(myTimer);
}

function switchPlayer() {
    
    if(oGameData.currentPlayer === oGameData.playerOne /*&& document.getElementById("checkTimer")*/) {
        
        oGameData.currentPlayer = oGameData.playerTwo;
        document.querySelector("h1").textContent = "Aktuell spelare är "+ oGameData.nickNamePlayerTwo + " " + oGameData.currentPlayer;
        
        
    }
    else if(oGameData.currentPlayer === oGameData.playerTwo /*&& document.getElementById("checkTimer")*/) {
        
        oGameData.currentPlayer = oGameData.playerOne;
        document.querySelector("h1").textContent = "Aktuell spelare är "+ oGameData.nickNamePlayerOne + " " + oGameData.currentPlayer;
        
        
    }
    
    
}
//Stoppar timern
function clearInter() {
    clearTimeout(myTimer);
    myTimer = setTimeout(switchPlayer, 3000);
}

//Skapar en ny checkBox och lägger den i DOM:en
function createCheckBox() {
let inputDiv = document.createElement("div");
let htmlDiv = document.getElementById("divInForm");

//Skapar en ny checkBox
let checkBox = document.createElement("input");
checkBox.type = "checkbox";
checkBox.name = "checkTimer";
checkBox.value = "value";
checkBox.id = "checkTimer";

let timerLabel = document.createElement("label");
timerLabel.htmlFor = "checkTimer";
timerLabel.appendChild(document.createTextNode("Fem sekunders timer"));

//Lägger till den nnya diven mellan "divInForm"'s 4:e barn
htmlDiv.insertBefore(inputDiv, htmlDiv.children[4]);
//Lägger till checkBoxen och labeln i den nya diven.
inputDiv.appendChild(checkBox);
inputDiv.appendChild(timerLabel);
}