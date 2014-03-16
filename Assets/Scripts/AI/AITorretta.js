#pragma strict

// Public member data

//static var enemyAttuale : GameObject;
static var antagonistaPrescelto : Transform;
static var sparando : boolean;

public var finedelMondo : Transform;
public var areaTorretta : float;

public var behaviourOnSpotted : MonoBehaviour;
public var soundOnSpotted : AudioClip;
public var behaviourOnLostTrack : MonoBehaviour;

// Private memeber data
private var torretta : Transform;

function Awake () {
	torretta = transform;
	sparando = false;
}

function OnEnable () {
	behaviourOnLostTrack.enabled = true;
	behaviourOnSpotted.enabled = false;
}

function Update () {
	if (sparando && !antagonistaPrescelto) {
		sparando = false;
	}
}

function OnTriggerEnter(other : Collider) {
//	if (other.gameObject.tag == "CarneFresca" && !sparando ) {
	if (other.gameObject.tag == "CarneFresca") {	
		if(CercaAntagonistaPrescelto()){
			antagonistaPrescelto = CercaAntagonistaPrescelto().transform;
			if (CanSeePlayer()){
				OnSpotted ();
			}
		}
		else {
			antagonistaPrescelto = null;
			OnLostTrack ();
		}
	}
}

function OnTriggerStay(other : Collider) {
	if (other.gameObject.tag == "CarneFresca" && behaviourOnSpotted.enabled == false) {	
		if(CercaAntagonistaPrescelto()){
			antagonistaPrescelto = CercaAntagonistaPrescelto().transform;
			if (CanSeePlayer()){
				OnSpotted ();
			}
		}
		else {
			antagonistaPrescelto = null;
		}
	}
}

function OnTriggerExit(other : Collider) {
//	if (other.gameObject.tag == "CarneFresca" && !sparando ) {
	if (other.gameObject.tag == "CarneFresca") {
		OnSpotted();
	} else {
		OnLostTrack();
	}
}

function OnSpotted () {
	if (!behaviourOnSpotted.enabled) {		
		behaviourOnSpotted.enabled = true;
		behaviourOnLostTrack.enabled = false;
		sparando = true;
		
		if (audio && soundOnSpotted) {
			audio.clip = soundOnSpotted;
			audio.Play ();
		}
	}
}

function OnLostTrack () {
	if (!behaviourOnLostTrack.enabled) {
		behaviourOnLostTrack.enabled = true;
		behaviourOnSpotted.enabled = false;
		sparando = false;
	}
}

function CercaAntagonistaPrescelto() : GameObject {

    var antagonistaPiuVicino : GameObject; 
    var distanzaMinore = Mathf.Infinity;
	var listaAntagonisti : GameObject[];
	
	var distanzaDaTorrettaMinore;
	
    listaAntagonisti = GameObject.FindGameObjectsWithTag("CarneFresca"); 
    // cerca tra tutti gli antagonisti il più vicino alla fineDelMondo e compreso nell'area della torretta
    for (var antagonista : GameObject in listaAntagonisti)  {

		var distanzaDaFineDelMondo = Vector3.Distance(antagonista.transform.position, finedelMondo.position);		
		var distanzaDaTorretta = Vector3.Distance(antagonista.transform.position, torretta.position);		
		Debug.Log ("Distanza da fine: " + distanzaDaFineDelMondo + ", distanza da torretta: " + distanzaDaTorretta);

		if (distanzaDaTorretta < areaTorretta){	
			if (distanzaDaFineDelMondo < distanzaMinore) { 
				antagonistaPiuVicino = antagonista; 
				distanzaMinore = distanzaDaFineDelMondo;				
				distanzaDaTorrettaMinore = distanzaDaTorretta;
			} 
		}	
  	} 
	Debug.Log ("Minore da fine: " + distanzaMinore + ", distanza da torretta: " + distanzaDaTorrettaMinore);
    return antagonistaPiuVicino;
}

function CanSeePlayer () : boolean {
	var playerDirection : Vector3 = (antagonistaPrescelto.position - torretta.position);
	var hit : RaycastHit;
	Physics.Raycast (torretta.position, playerDirection, hit, playerDirection.magnitude);
	if (hit.collider && hit.collider.transform == antagonistaPrescelto) {
		return true;
	}
	return false;
}
