/* 
Puissance 4 en Javascript
Author : Emeric Hochart
Date : 12/01/2019
Version : 1.1
*/

// Fonctions
// Fonction de création du board
function createBoard(ligne,colonne){
    // On vide l'affichage
    contenuElt.innerHTML="";
    // On crée l'élément table du DOM
    let tableElt=document.createElement('table');
    // Chaque case est un élément du tableau à deux dimensions
    // On parcours les lignes
    for (let i=0; i<ligne;i++){
        // Deuxième dimension du tableau
        board[i]=new Array();
        // Element tr du DOM
        let ligneElt=document.createElement('tr');
        ligneElt.id="L"+i;
        // On parcours les colonnes de la ligne
        for (let j=0; j<colonne; j++){
            // Chaque case est initialisée à 0
            board[i][j]=0;
            // Element td du DOM
            let colonneElt=document.createElement('td');
            colonneElt.id="L"+i+"C"+j;
            // Ajout des colonnes à la ligne
            ligneElt.appendChild(colonneElt);
        };
        // Ajout des lignes au tableau
        tableElt.appendChild(ligneElt);
    };
    // ajout du tableau au contenu
    contenuElt.appendChild(tableElt);
}


// Fonction d'initialisation d'une nouvelle partie
function newGame(){
    createBoard(ligne,colonne);
    createEvent(ligne,colonne);
}


// Fonction d'ajout des évènement click sur le tableau
function createEvent(ligne,colonne){
    // On créé les évènements sur les cases
    for (let i=0; i<ligne;i++){
        for (let j=0; j<colonne; j++){
            //ajoutEventCase(i,j);
            let caseElt=document.getElementById("L"+i+"C"+j);
            caseElt.addEventListener('click',clickEvent);
        };
    };
}

// Fonction clickEvent
function clickEvent(){
    let l=Number(this.id.charAt(3));
    let k=ligne-1;
        while (k>-1){
            if (board[k][l]==0){
                let caseMinElt=document.getElementById("L"+k+"C"+l);
                let divElt=document.createElement('div');
                divElt.className="player";
                caseMinElt.appendChild(divElt);
                divElt.style.backgroundColor=player==1?"red":"yellow";
                board[k][l]=player;
                // Ici placé la vérification de victoire
                verifVictoire(k,l);
                player*=-1;
                k=-1;
            }
            else {
            k--
            };
        };
}


// Fonction de Vérification de victoire

function verifVictoire(i,j){
    // Vérification horizontale
    let countLigne=0;
    let h=0;
    while (h<colonne){
        if (board[i][h]==player){
            countLigne++;
            h++;
        }
        else if (board[i][h]!==player&&countLigne==4){
            h++;
        }
        else {
            countLigne=0;
            h++;
        };
    };
    
    // Vérification verticale
    let countColonne=0;
    let v=0;
    while (v<ligne){
        if (board[v][j]==player){
            countColonne++;
            v++;
        }
        else if (board[v][j]!==player&&countColonne==4){
            v++;
        }
        else {
            countColonne=0;
            v++;
        };
    };
    
    // Vérification diagonale
    let countDiag=0;
    let d=-Math.min(i,j);
    
    while(i+d<ligne&&j+d<colonne&&i+d>=0&&j+d>=0){
        
        if (board[i+d][j+d]==player){
            countDiag++;
            d++;
        }
        else if (board[i+d][j+d]!==player&&countDiag==4){
            d++;
        }
        else {
            countDiag=0;
            d++;
        };
    };
    
    // Vérification anti-diagonale
    let countAntiDiag=0;
    let a=-Math.min(i,colonne-1-j);
    while(i+a<ligne&&j-a<colonne&&i+a>=0&&j-a>=0){
        if (board[i+a][j-a]==player){
            countAntiDiag++;
            a++;
        }
        else if (board[i+a][j-a]!==player&&countAntiDiag==4){
            a++;
        }
        else {
            countAntiDiag=0;
            a++;
        };
    } ;
    
    
    // Affichage Résultat
    if (countLigne>=4||countColonne>=4||countDiag>=4||countAntiDiag>=4){
        
        victoire=true;
        // Affichage Vainqueur
        let gagnant=(player==1)?"Rouge":"Jaune";
        let victoireElt=document.createElement('div');
        victoireElt.innerHTML="<h2>Le vainqueur est "+gagnant+" </h2>";
        contenuElt.appendChild(victoireElt);
        // On supprime les évènements clics
        for (let i=0; i<ligne;i++){
            for (let j=0; j<colonne; j++){
               let caseElt=document.getElementById("L"+i+"C"+j);
                caseElt.style.backgroundColor="blue";
                caseElt.removeEventListener('click',clickEvent);
              
            };
        };
       
    }
    else {
        console.log("tour suivant");
        // Affichage Tour suivant 
    };
}


// Initialisation
let colonne=5;
let ligne=5;
let board=new Array();
let contenuElt=document.getElementById('contenu');
contenuElt.innerHTML="Puissance 4 en Javascript | Author : Emeric Hochart | Date : 18/01/2019 | Version : 1.1";
let player=1;

let boutonElt = document.getElementById('newGame');
// Ajout d'un gestionnaire pour l'événement click
boutonElt.addEventListener("click", function(){
    // Joueur 1 est le joueur rouge
    player=1;
    newGame();
});