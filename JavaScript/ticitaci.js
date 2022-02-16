const feld = document.querySelectorAll(".feld");
const spieler_1 = "X";
const spieler_2 = "O";
let dran = spieler_1;



const spielzustand = Array(feld.length);
spielzustand.fill(null);


const rotelinie = document.getElementById("rotelinie");
const spielmeldungsfeld  = document.getElementById("spielmeldungsfeld");
const spielmeldungs_text = document.getElementById("spielmeldungs_text");
const neustart = document.getElementById("neustart");
neustart.addEventListener("click",neuesspiel)

feld.forEach((felds) => felds.addEventListener("click",feldsclick));

function rueberfahren(){
    feld.forEach((felds) =>{
        felds.classList.remove("x_rueberfahren");
        felds.classList.remove("o_rueberfahern");
    });
    const hoverClass = `${dran.toLowerCase()}-hover`;
    
    feld.forEach((felds)=>{
        if(felds.innerText == ""){
            felds.classList.add(hoverClass);
        }
    });
}

rueberfahren();

function feldsclick(event){
    if(spielmeldungsfeld.classList.contains("sichtbar")){
    return;
}
    const felds = event.target;
    const feldnummer = felds.dataset.index;
    if(felds.innerText != ""){
        return;
    }
    if(dran === spieler_1){
        felds.innerText = spieler_1;
        spielzustand[feldnummer- 1] = spieler_1;
        dran = spieler_2;
    }
    else{
        felds.innerText = spieler_2;
        spielzustand[feldnummer- 1] = spieler_2;
        dran = spieler_1;   
    }
    rueberfahren();
    gewinnerueberpruefung();
} 

function gewinnerueberpruefung(){
    for(const gewinnmoeglichkeiten of gewinnmoeglichkeitens){
        
        const{kombination,strikeClass} = gewinnmoeglichkeiten
        const feldwert1 = spielzustand[kombination[0]-1];
        const feldwert2 = spielzustand[kombination[1]-1]; 
        const feldwert3 = spielzustand[kombination[2]-1];
        
        if(feldwert1 != null && feldwert1 === feldwert2 && feldwert1 === feldwert3) {
            rotelinie.classList.add(strikeClass)
            verlieranimation(feldwert1);
            return;
        }
    }
    const allefelderausgefuellt = spielzustand.every((felds)=> felds !== null);
    if(allefelderausgefuellt){
        verlieranimation(null);
    }




   
}

function verlieranimation(gewinnertext){
    let text = 'unentschieden';
    if(gewinnertext != null){
        text = `Gewinner ist ${gewinnertext}`;
    }
    spielmeldungsfeld.className = 'sichtbar';
    spielmeldungs_text.innerText = text;
}


const gewinnmoeglichkeitens = [
    {kombination:[1,2,3], strikeClass:'rotelinie_zeile_1'},
    {kombination:[4,5,6], strikeClass:'rotelinie_zeile_2'},
    {kombination:[7,8,9], strikeClass:'rotelinie_zeile_3'},

    {kombination:[1,4,7], strikeClass:'rotelinie_spalt_1'},
    {kombination:[2,5,8], strikeClass:'rotelinie_spalt_2'},
    {kombination:[3,6,9], strikeClass:'rotelinie_spalt_3'},

    {kombination:[1,5,9], strikeClass:'rotelinie_diagonal_1'},
    {kombination:[3,5,7], strikeClass:'rotelinie_diagonal_2'},
];

function neuesspiel(){
     rotelinie.className = "rotelinie";
     spielmeldungsfeld.className = "versteckt";
     spielzustand.fill(null);
     feld.forEach(felds=>felds.innerText = "");
     dran = spieler_1;
     rueberfahren();
}
