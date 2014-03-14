#pragma strict

var speed : float = 10;
var lifeTime : float = 0.5;
var dist : float = 10000;
var frequency : float = 2;
private var spawnTime : float = 0.0;
private var tr : Transform;
private var lastFireTime : float = -1;

function OnEnable () {
	tr = transform;
	spawnTime = Time.time;
	lastFireTime = Time.time;
}

function Update () {

		if (Time.time > lastFireTime + 1 / frequency) {
			OnEnable ();
		}
	
	tr.position += tr.forward * speed * Time.deltaTime;
	dist -= speed * Time.deltaTime;
	
	if (Time.time > spawnTime + lifeTime || dist < 0) {
		Spawner.Destroy (gameObject);
	}
}