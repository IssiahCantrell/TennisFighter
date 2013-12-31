#pragma strict

var player : GameObject;
var health : int;
var maxSpeed: float = 7f;
var jumpHeight: float = 20f;

function Awake ()
{
	//Setting up the reference to the player.
	player = GameObject.FindGameObjectWithTag("Player");
}

function jump(){
	//set velocity to move upwards
	rigidbody2D.velocity.y = jumpHeight;
}

function OnCollisionEnter2D(collision : Collision2D) {
		Debug.Log('Enemy: Collision occured with ' + collision.collider.tag + '.', gameObject);
		
		//if colliding with player damage player and disappear
		if(collision.collider.tag == "Player"){
			player.GetComponent.<PlayerControl>().health--;
			Destroy(gameObject);
		}
		
		//if colliding with ground then jump
		if(collision.collider.tag == "ground"){
			jump();
		}
}


function Update () {
	
	//scale x-axis velocity to match distance to the player but don't exceed top speed
	var dif: int  = player.transform.position.x - transform.position.x;
	
	if(dif > maxSpeed)
		dif = maxSpeed;
		
	if(dif < -maxSpeed)
		dif = -maxSpeed;
	
	rigidbody2D.velocity.x = dif;
}