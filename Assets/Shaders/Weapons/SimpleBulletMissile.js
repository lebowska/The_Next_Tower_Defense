#pragma strict

var speed : float = 10;
var lifeTime : float = 0.5;
public var damageAmount : float = 5;
public var forceAmount : float = 5;
public var radius : float = 1.0;
public var ignoreLayers : LayerMask;
public var noise : float = 0.0;
public var explosionPrefab : GameObject;

private var dir : Vector3;
private var tr : Transform;
private var sideBias : float;

private var spawnTime : float = 0.0;

function OnEnable () {
	tr = transform;
	dir = transform.forward;
	spawnTime = Time.time;
	sideBias = Mathf.Sin (Time.time * 5);
}

function Update () {
	tr.position += tr.forward * speed * Time.deltaTime;
	if (Time.time > spawnTime + lifeTime) {
		Spawner.Destroy (gameObject);
	}
	
	// Check if this one hits something
	var hits : Collider[] = Physics.OverlapSphere (tr.position, radius, ~ignoreLayers.value);
	var collided : boolean = false;
	for (var c : Collider in hits) {
		// Don't collide with triggers
		if (c.isTrigger)
			continue;
		
		var targetHealth : Health = c.GetComponent.<Health> ();
		if (targetHealth) {
			// Apply damage
			targetHealth.OnDamage (damageAmount, -tr.forward);
		}
		// Get the rigidbody if any
		if (c.rigidbody) {
			// Apply force to the target object
			var force : Vector3 = tr.forward * forceAmount;
			force.y = 0;
			c.rigidbody.AddForce (force, ForceMode.Impulse);
		}
		collided = true;
	}
	if (collided) {
		Spawner.Destroy (gameObject);
		Spawner.Spawn (explosionPrefab, transform.position, transform.rotation);
	}
	
}
