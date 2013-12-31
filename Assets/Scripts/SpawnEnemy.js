#pragma strict

var delay : float = 3.0f;
var frequency : float = 10.0f;
var max_jump_height : float = 35.0f;
var min_jump_height : float =10.0f;
var enemy : GameObject;

function Start () {
	//seed random number generator
	Random.seed = 12;
	//call spawn function after <delay> seconds every <frequency> seconds.
	InvokeRepeating("Spawn", delay, frequency);
}

function Spawn() {
	//clone new enemy object
	var enemyInstance : GameObject = Instantiate(enemy, transform.position, transform.rotation);
	//give it a random jump height
	var jh : float = Random.Range(min_jump_height , max_jump_height);
	//set jump height
	enemyInstance.GetComponent.<EnemyControl>().jumpHeight = jh;
	
	Debug.Log('enemy spawned.', gameObject);
}