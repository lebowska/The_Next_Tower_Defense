#pragma strict

@script RequireComponent (Rigidbody)

class MechMovementMotorTorrettaLanciaGordo extends MovementMotor {

	public var aimingSpeed : float = 150.0;
	
	public var head : Transform;
	private var headRotation : Quaternion = Quaternion.identity;
		
	function LateUpdate () {	
		// Target with head
		if (facingDirection != Vector3.zero) {
		
			//Debug.Log("entratoLate, :" + facingDirection);
			//Debug.DrawRay(transform.position, facingDirection, Color.green, 1.0);
			
			var targetRotation : Quaternion = Quaternion.LookRotation (facingDirection);
			headRotation = Quaternion.RotateTowards (
				headRotation,
				targetRotation,
				aimingSpeed * Time.deltaTime
			);
			head.rotation = headRotation * Quaternion.Inverse (transform.rotation);
		}
	}
}
