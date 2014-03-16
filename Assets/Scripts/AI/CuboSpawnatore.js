#pragma strict


public var antagonistaSfigato : GameObject;
public var antagonistaMediamenteFico : GameObject;
public var antagonistaStrafico : GameObject;

public var vasodiPandora : Transform;
//public var patrolRoute : GameObject;

public var numero_Ondata1: float = 10;
public var numero_Ondata2: float = 5;

public var antSfigati_Ondata1 : float = 6;
public var antMediamenteFichi_Ondata1 : float = 2;
public var antStraFichi_Ondata1 : float = 1;

public var antSfigati_Ondata2 : float = 8;
public var antMediamenteFichi_Ondata2 : float = 4;
public var antStraFichi_Ondata2 : float = 2;

public var timerWaveSingola : float = 4.0f;

public var timerSfigatoWave : float = 1.5f;
public var timerMediamenteFicoWave : float = 3.2f;
public var timerStraficoWave : float = 3.4f;;


private var playerTransform : Transform;
private var thisTransform : Transform;
//private var vasodiPandora : Transform;

private var cliccato : boolean;
private var apriMenuOndata : boolean;
private var partiti : boolean;


function Start () {
	thisTransform = this.transform;
	playerTransform = GameObject.FindWithTag("Player").transform;
//	vasodiPandora = GameObject.Find("VasodiPandora").transform;
	
	cliccato = false;
	partiti = false;
	apriMenuOndata = false;
}

function OnMouseDown() {
	var distanzadaGiocatore : float = Vector3.Distance(playerTransform.position, thisTransform.position);
	if (distanzadaGiocatore > 5.0) {
		return;
	}
	else {
		Spawna ();
	}
}

function Spawna () {
	if (!cliccato) {
		cliccato = true;
	}	
	if (!partiti){
	apriMenuOndata = !apriMenuOndata;
	}
}

function OnGUI () {
	if (apriMenuOndata) {
	
		//GUI.backgroundColor = Color.grey;
		//GUI.contentColor = Color.black;		
		GUI.Box (Rect ((Screen.width / 2) - 120,(Screen.height / 2) - 120,240,100), "");
		if (GUI.Button (Rect ((Screen.width / 2) + 99, (Screen.height / 2) - 120,21,21), "X")) {
			apriMenuOndata = false;
		}
		GUI.Label	(Rect ((Screen.width / 2) - 35,(Screen.height / 2) - 90,90,20), "Vuoi morire?");	
		if (GUI.Button  (Rect ((Screen.width / 2) - 70,(Screen.height / 2) - 60,40,20), "Si")) {
			partiti = true;
			apriMenuOndata = false;
			Ondata();
		}	
		if (GUI.Button  (Rect ((Screen.width / 2) + 5,(Screen.height / 2) - 60,80,20), "No,grazie")) {
			apriMenuOndata = false;
		}
	}
}

function Ondata () {
//		GameObject.Find("VasodiPandora").transform.position  Quaternion.LookRotation(vasodiPandora.position)

//		Rotate the object so that the y-axis faces along the normal of the surface
//		var contact : ContactPoint = collision.contacts[0];
//		var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);
//		var pos : Vector3 = contact.point;

	//Spawner.Spawn (patrolRoute, vasodiPandora.position, transform.rotation);
	
	//yield WaitForSeconds(2.0);	
	
	for (var ondata1 = 0; ondata1 < numero_Ondata1; ondata1++){			
		for (var x = 0; x < antSfigati_Ondata1; x++){		
			Spawner.Spawn (antagonistaSfigato, vasodiPandora.position, transform.rotation);			
			yield WaitForSeconds(timerSfigatoWave);		
		}
		yield WaitForSeconds(timerMediamenteFicoWave-timerSfigatoWave);			
		for (var y = 0; y < antMediamenteFichi_Ondata1; y++){		
			Spawner.Spawn (antagonistaMediamenteFico, vasodiPandora.position, Quaternion.identity);			
			yield WaitForSeconds(timerMediamenteFicoWave);
		}
		yield WaitForSeconds(timerStraficoWave-timerMediamenteFicoWave);
		for (var z = 0; z < antStraFichi_Ondata1; z++){		
			Spawner.Spawn (antagonistaStrafico, vasodiPandora.position, Quaternion.identity);
			yield WaitForSeconds(timerStraficoWave);
		}		
		yield WaitForSeconds(timerWaveSingola);		
	}
	
	yield WaitForSeconds(2.0);	
	for (var ondata2 = 0; ondata2 < numero_Ondata2; ondata2++){			
		for (var a = 0; a < antSfigati_Ondata2; a++){
			Spawner.Spawn (antagonistaSfigato, vasodiPandora.position, transform.rotation);			
			yield WaitForSeconds(timerSfigatoWave);		
		}
		yield WaitForSeconds(timerMediamenteFicoWave-timerSfigatoWave);					
		for (var b = 0; b < antMediamenteFichi_Ondata2; b++){		
			Spawner.Spawn (antagonistaMediamenteFico, vasodiPandora.position, Quaternion.identity);			
			yield WaitForSeconds(timerMediamenteFicoWave);
		}	
		yield WaitForSeconds(timerStraficoWave-timerMediamenteFicoWave);	
		for (var c = 0; c < antStraFichi_Ondata2; c++){		
			Spawner.Spawn (antagonistaStrafico, vasodiPandora.position, Quaternion.identity);
			yield WaitForSeconds(timerStraficoWave);
		}		
		yield WaitForSeconds(timerWaveSingola);		
	}
	
}
