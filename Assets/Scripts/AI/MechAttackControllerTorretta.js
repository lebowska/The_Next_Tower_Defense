#pragma strict

// Public member data
public var motor : MovementMotor;
public var head : Transform;

//non ha effetto, messa fissa nel codice
public var areaTorretta : float;

public var weaponBehaviours : MonoBehaviour[];
public var fireFrequency : float = 2;

// Private memeber data
private var aiTorretta : AITorretta;

private var character : Transform;
private var antagonista : Transform;

private var antagonistaInArea : boolean;

private var inRange : boolean = false;
private var nextRaycastTime : float = 0;
private var lastRaycastSuccessfulTime : float = 0;

private var firing : boolean = false;
private var lastFireTime : float = -1;
private var nextWeaponToFire : int = 0;

function Awake () {
	character = motor.transform;
	aiTorretta = transform.parent.GetComponentInChildren.<AITorretta> ();
}

function OnEnable () {
	inRange = false;
	nextRaycastTime = Time.time + 1;
	lastRaycastSuccessfulTime = Time.time;
}

function OnDisable () {
	Shoot (false);
	AITorretta.sparando = false;
}

function Shoot (state : boolean) {
	firing = state;
}

function Fire () {
	if (weaponBehaviours[nextWeaponToFire]) {
		weaponBehaviours[nextWeaponToFire].SendMessage ("Fire");
		nextWeaponToFire = (nextWeaponToFire + 1) % weaponBehaviours.Length;
		lastFireTime = Time.time;
	}
}

function Update () {
	if (AITorretta.antagonistaPrescelto){	
		// Calculate the direction from the player to this character
		antagonista = AITorretta.antagonistaPrescelto;
		var direzioneAntagonista : Vector3 = (antagonista.position - character.position);
		direzioneAntagonista.y = 0;
		var playerDist : float = direzioneAntagonista.magnitude;
		direzioneAntagonista /= playerDist;
		
		// Set this character to face the player,
		// that is, to face the direction from this character to the player
		motor.facingDirection = direzioneAntagonista;		
		var distanzaDaTorretta = Vector3.Distance(antagonista.position, character.position);
		
		if (distanzaDaTorretta < 8){
			if (Time.time > nextRaycastTime) {
				nextRaycastTime = Time.time + 1;
				if (aiTorretta.CanSeePlayer ()) {
					lastRaycastSuccessfulTime = Time.time;
					if (IsAimingAtPlayer ()){	
						Shoot (true);
					} else {
						Shoot (false);
					}
				} else {
					Shoot (false);
					antagonistiInArea();
					if(!antagonistaInArea){
						aiTorretta.OnLostTrack ();
						AITorretta.sparando = false;
					}	
				}
			}		
			if (firing) {
				if (Time.time > lastFireTime + 1 / fireFrequency) {
					Fire ();
				}
			}
		} else {
			antagonistiInArea();
			if(!antagonistaInArea){
				aiTorretta.OnLostTrack ();
				AITorretta.sparando = false;
			}	
		}
	} else {
		antagonistiInArea();
		if(!antagonistaInArea){
			aiTorretta.OnLostTrack ();
			AITorretta.sparando = false;
		}	
	}
}

// controlla se l'antagonista più vicino è in range
function antagonistiInArea(){
	AITorretta.antagonistaPrescelto = aiTorretta.CercaAntagonistaPrescelto().transform;
	
	if(AITorretta.antagonistaPrescelto){
		var distanzaDaTorretta = Vector3.Distance(AITorretta.antagonistaPrescelto.position, character.position);
		if(distanzaDaTorretta < 8){
			antagonistaInArea = true;
		} else {
			antagonistaInArea = false;
		} 
	} else {
		antagonistaInArea = false;
	}
}


function IsAimingAtPlayer () : boolean {
	var direzioneAntagonista : Vector3 = (antagonista.position - head.position);
	direzioneAntagonista.y = 0;
	return Vector3.Angle (head.forward, direzioneAntagonista) < 15;
}