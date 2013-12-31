#pragma strict

function OnCollisionEnter2D(collision : Collision2D) {
		Debug.Log('Bullet: Collision occured with ' + collision.collider.tag + '.', gameObject);
		
		//if collide with emy destroy self and enemy
		if(collision.collider.tag == "Enemy"){
			Destroy(collision.gameObject);
			Destroy(gameObject);
		}
			
}

function Awake(){
	//desroy self after six seconds
	Destroy(gameObject, 6);
}
