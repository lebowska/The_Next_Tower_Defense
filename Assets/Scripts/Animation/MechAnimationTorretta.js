#pragma strict

var rigid : Rigidbody;
//var idle : AnimationClip;
//var audioSource : AudioSource;

private var tr : Transform;
private var lastAnimTime : float = 0;

function OnEnable () {
	tr = rigid.transform;
	//animation[idle.name].layer = 0;
	//animation[idle.name].weight = 1;
	//animation[idle.name].enabled = true;
	
	//idle.Play();
	//audioSource.Play ();
}

function FixedUpdate () {
}
