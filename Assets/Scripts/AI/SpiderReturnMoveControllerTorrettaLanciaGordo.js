#pragma strict

// Public member data
public var motor : MovementMotor;

// Private memeber data
private var aiTorretta : AITorretta;

private var character : Transform;
private var spawnPos : Vector3;
public var animationBehaviour : MonoBehaviour;

function Awake () {
//	spawnPos = character.position;
	var direzioneAntagonista : Vector3;
	motor.facingDirection = direzioneAntagonista;	
	animationBehaviour.enabled = true;
}

function Update () {
	return;
}
