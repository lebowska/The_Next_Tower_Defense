#pragma strict

// Public member data
public var motor : MovementMotor;

// Private memeber data
private var ai : AI_originale;

private var character : Transform;
private var spawnPos : Vector3;
public var animationBehaviour : MonoBehaviour;

function Awake () {
	character = motor.transform;
	ai = transform.parent.GetComponentInChildren.<AI_originale> ();
	spawnPos = character.position;
}

function Update () {
	motor.movementDirection = spawnPos - character.position;
	motor.movementDirection.y = 0;
	if (motor.movementDirection.sqrMagnitude > 1)
		motor.movementDirection = motor.movementDirection.normalized;
	
	if (motor.movementDirection.sqrMagnitude < 0.01) {
		character.position = new Vector3 (spawnPos.x, character.position.y, spawnPos.z);
		motor.rigidbody.velocity = Vector3.zero;
		motor.rigidbody.angularVelocity = Vector3.zero;
		motor.movementDirection = Vector3.zero;
		enabled = false;
		animationBehaviour.enabled = false;
	}
}
