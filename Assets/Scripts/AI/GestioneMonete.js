#pragma strict

static var monete : int = 50;

function Start () {
	monete = 1000;
}

function Update () {
//	if(GestioneMonete.monete == 10){
//    Application.LoadLevel("LivelloFine");
}

	
static function RegistraMorte (tagTorretta : String, nomeTorretta : String) {
	monete = monete+1;
	if (tagTorretta == "CarneFresca"){
	monete = monete+3;
		if (nomeTorretta == "EnemyMechWithNoiseE"){
		monete = monete+6;
		}
		if (nomeTorretta == "EnemyMechWithNoiseEnemy"){
		monete = monete+15;
		}
	}
}

static function TogliMonete (prezzo : int) {
	monete  = monete - prezzo;
}
static function AggiungiMonete (prezzo : int) {
	monete += prezzo;
}

static function MuoviMonete (prezzo : int, operazione : String) {
	if (operazione == "somma"){
	monete += prezzo;
	}
	else {
	monete -= prezzo;
	}
}

function OnGUI(){  
	GUI.Box (Rect (20,20,120,40), "");
	GUI.Label	(Rect (30, 30, 100, 20), "Monete: " + monete.ToString());
}

//function OnGUI(){   
//GUI.Label(Rect((Screen.width / 2) + 20,10, 200, 30), "Monete: " + monete);
//}