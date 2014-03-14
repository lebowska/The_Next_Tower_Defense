#pragma strict

function Start () {
	yield WaitForSeconds(0.1);
	Spawner.Destroy (gameObject);
}