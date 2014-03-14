#pragma strict

// Public member data
public var motor : MovementMotor;
public var head : Transform;

//non ha effetto, messa fissa nel codice
public var areaAntagonista : float;

// Private memeber data
private var aiAntagonista : AIAntagonista;

private var character : Transform;
private var torretta : Transform;

private var torrettaInArea : boolean;

function Awake () {
	aiAntagonista = transform.parent.GetComponentInChildren.<AIAntagonista> ();
}

function Update () {
	if (AIAntagonista.torrettaPrescelta){	
		// Calculate the direction from the player to this character
		torretta = AIAntagonista.torrettaPrescelta;
		var direzioneTorretta : Vector3 = (torretta.position - character.position);
		direzioneTorretta.y = 0;
		var playerDist : float = direzioneTorretta.magnitude;
		direzioneTorretta /= playerDist;
		
		// Set this character to face the player,
		// that is, to face the direction from this character to the player
		motor.facingDirection = direzioneTorretta;
		
		var distanzaDaAntagonista = Vector3.Distance(torretta.position, character.position);
		
	} else {
		torretteInArea();
		if(!torrettaInArea){
			aiAntagonista.OnPatrol ();
		}	
	}
}

// controlla se la torretta più vicina è in range
function torretteInArea(){
	AIAntagonista.torrettaPrescelta = aiAntagonista.CercaTorrettaPrescelta().transform;
	
	if(AIAntagonista.torrettaPrescelta){
		var distanzaDaAntagonista = Vector3.Distance(AIAntagonista.torrettaPrescelta.position, character.position);
		if(distanzaDaAntagonista < 8){
			torrettaInArea = true;
		} else {
			torrettaInArea = false;
		} 
	} else {
		torrettaInArea = false;
	}
}