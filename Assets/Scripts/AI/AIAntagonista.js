#pragma strict

// Public member data
static var torrettaPrescelta : Transform;

public var behaviourOnSpotted : MonoBehaviour;
public var soundOnSpotted : AudioClip;
public var behaviourOnPatrol: MonoBehaviour;

//non ha effetto, messa fissa nel codice
public var areaAntagonista : float;

// Private memeber data
private var antagonista : Transform;
private var patrolRoute : PatrolRoute;

function Awake () {
	antagonista = transform;
}

function OnEnable () {
	behaviourOnPatrol.enabled = true;
	behaviourOnSpotted.enabled = false;
}

function OnSpotted () {
//	if (!behaviourOnSpotted.enabled) {
//		behaviourOnSpotted.enabled = true;
//		behaviourOnPatrol.enabled = false;
		
		if (audio && soundOnSpotted) {
			audio.clip = soundOnSpotted;
			audio.Play ();
		}
//	}
}

function OnPatrol () {
	if (!behaviourOnPatrol.enabled) {
		behaviourOnPatrol.enabled = true;
		behaviourOnSpotted.enabled = false;
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Torretta") {
		torrettaPrescelta = CercaTorrettaPrescelta().transform;
		OnSpotted ();
	}
}

function OnTriggerExit (other : Collider) {
	if (!other.gameObject.tag == "Torretta") {
		OnPatrol ();
	}
}

function CercaTorrettaPrescelta() : GameObject {
    var torrettaPiuVicina : GameObject; 
    var distanzaMinore = Mathf.Infinity;
	var listaTorrette : GameObject[];	
	var distanzaDaAntagonistaMinore;	
    listaTorrette = GameObject.FindGameObjectsWithTag("Torretta"); 
    // cerca tra tutte le torrette la più vicina
    for (var torretta : GameObject in listaTorrette)  {	
		var distanzaDaAntagonista = Vector3.Distance(torretta.transform.position, antagonista.position);
		if (distanzaDaAntagonista < 8){	
			torrettaPiuVicina = torretta; 				
			distanzaDaAntagonistaMinore = distanzaDaAntagonista;
		}	
  	}
    return torrettaPiuVicina;
}
