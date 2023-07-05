let matrixWidth = 110;
let matrixHeight = 54;
let probability = 0.1; // pourcentage de 1
var matrix2D = Array.from({ length: matrixHeight }, () => Array.from({ length: matrixWidth }, () => Math.random() < probability ? 0 : 1));  // tableau contenat des 0 et des 1, utilisé pour l'automate cellulaire

var bgTxt = document.getElementById("bgTxt");


// regles de départ pour l'automate cellulaire
var underpopulation = 3;
var overpopulation = 5;
var birth = 4;


//tableau qui contient seulement le texte d'information
var infoText2D = Array.from({ length: matrixHeight }, () => Array(matrixWidth).fill(null));
let infoText = `Hello-world

Vous-êtes-dans-la-matrice

05/07/2023`
infoText = infoText.split("\n");
let posText = [Math.floor(matrixWidth/3), 20];
for (let i = 0; i < infoText.length; i++){
	for (let y = 0; y < infoText[i].length; y++){
		infoText2D[posText[1] + i][posText[0] + y] = infoText[i][y];
	}
}


function changeRules() {
	underpopulation = Math.floor(Math.random() * 8);
	overpopulation = Math.floor(Math.random() * (8 - underpopulation + 1)) + underpopulation;
	birth = Math.floor(Math.random() * (overpopulation - underpopulation + 1)) + underpopulation;
	//console.log("underpopulation:" + underpopulation + ", overpopulation:" + overpopulation + ", birth" + birth);
}


function changeText() {
	let matrix2DCopy = matrix2D.slice();
	let innerTxt = "";
	let countOnes = 0;  // un compteur pour savoir combien il y a de 1 dans le tableau
  
    for (let i = 1; i < matrix2D.length -1; i++){
	    for (let y = 1; y < matrix2D[i].length -1; y++){
			if (infoText2D[i][y] != null) {  // si il y a une lettre à afficher dans cette case on ne fait de calculs lié a l'automate cellulaire
				innerTxt += "<span class='cinfo'>" + infoText2D[i][y] + "</span> ";
			} else {
				
				let neighbor = ((matrix2D[i - 1][y] != 0)
				+ (matrix2D[i - 1][y + 1] != 0)
				+ (matrix2D[i - 1][y - 1] != 0)
				+ (matrix2D[i + 1][y] != 0)
				+ (matrix2D[i + 1][y + 1] != 0)
				+ (matrix2D[i + 1][y - 1] != 0)
				+ (matrix2D[i][y - 1] != 0)
				+ (matrix2D[i][y + 1] != 0));

				if (neighbor < underpopulation) {
					matrix2DCopy[i][y] = 0;
					innerTxt += "<span class='cfalse'> " + matrix2D[i][y] + "</span> ";
				} else if (neighbor === birth) {
					matrix2DCopy[i][y] = 1;
					innerTxt += "<span class='ctrue'> " + matrix2D[i][y] + "</span> ";
				} else if (neighbor > overpopulation) {
					matrix2DCopy[i][y] = 0;
					innerTxt += "<span class='cfalse'> " + matrix2D[i][y] + "</span> ";
				} else {
					if (matrix2D[i][y]) {
						matrix2DCopy[i][y] = 1
						innerTxt += "<span class='ctrue'> " + matrix2D[i][y] + "</span> ";
					} else {
						matrix2DCopy[i][y] = 0
						innerTxt += "<span class='cfalse'> " + matrix2D[i][y] + "</span> ";
					}
				}
				countOnes += matrix2D[i][y]; // le nombre est 1 on incrémente le compteur
			}
	    }
	    innerTxt += "<br>";  // retour a la ligne après chaque ligne du tableau
    }
	
	matrix2D = matrix2DCopy;
    bgTxt.innerHTML = innerTxt;  // on remplace le texte de l'ancienne génération par le nouveau
	
	if (countOnes < 5) {  // si jamais l'écran est quasi rempli de zero on change les regles de l'automate cellulaire
		console.log("Too many zero");
		changeRules();
	}
}

var interval = setInterval(changeText, 120);
var interval = setInterval(changeRules, 3600);