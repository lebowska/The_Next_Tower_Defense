#pragma strict

public var digievolviSignal : SignalSender;
public var muoriSignals : SignalSender;

private var character : Transform;


function Awake () {
	character = transform;
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "DigievolviTorretta") {
	Digievolvi ();	
	}
	if (other.gameObject.tag == "UccidiTorretta") {
//	Debug.Log ("Entrato in collisionTriggerRicevitore");
	Muori ();	
	}
}

function Digievolvi () {
	digievolviSignal.SendSignals (this);	
}

function Muori () {
//	Debug.Log ("Entrato in muori");
//	Spawner.Destroy (gameObject);
//	Destroy (character.gameObject);
	muoriSignals.SendSignals (this);	
}