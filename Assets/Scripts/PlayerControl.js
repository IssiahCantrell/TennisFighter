#pragma strict

var move_stick : Joystick;
var shoot_stick : Joystick;
var shoot_speed : float = 0.5f;
var shoot_timer : float = 0.0f;
var bullet_speed : float = 20f;
var health : int = 10;
var bullet : GameObject;

var hit_ball_audio : AudioClip;
var death_audio : AudioClip;

var facing_right : boolean = false;

function fire(){
	//if timeout is less is greater than the time it takes to shoot the player can shoot
	if(shoot_timer >= shoot_speed){
		//Instantiate the bullet and its Components
		var bulletInstance : GameObject;
		bulletInstance = Instantiate(bullet, transform.position, Quaternion.identity);
		bulletInstance.AddComponent.<Rigidbody2D>();
		bulletInstance.AddComponent.<PolygonCollider2D>();
		
		if(facing_right)
		{
			//Set it's velocity to the right. 
			bulletInstance.rigidbody2D.velocity = new Vector2(bullet_speed, 0);
		}
		else
		{
			//Otherwise set it's velocity to the left.
			bulletInstance.rigidbody2D.velocity = new Vector2(-bullet_speed, 0);
		}
		
		audio.PlayOneShot(hit_ball_audio);
		
		//reset shoot timer
		shoot_timer = 0.0f;
	}
}

function move_left(){
	//set the scale to a positive value. Has the effect of flipping character to the left.
	transform.localScale.x = Mathf.Abs(transform.localScale.x);
	//change direction
	facing_right= false;
	//set velocity
	rigidbody2D.velocity.x = -10;
}

function move_right(){
	//set the scale to a negative value. Has the effect of flipping character to the right.
	transform.localScale.x = -1 * Mathf.Abs(transform.localScale.x);
	//change direction
	facing_right = true;
	//set velocity
	rigidbody2D.velocity.x = 10;
}

function Update () {
	//if the shoot touch pad is tapped then shoot.
	if(shoot_stick.tapCount)
		fire();
	//if move touch pad is drawn to the left move left
	if(move_stick.position.x < 0)
		move_left();
	//if move touch pad is drawn to the right move right
	else if(move_stick.position.x > 0)
		move_right();
	//else stop moving
	else	
		rigidbody2D.velocity.x = 0;
	//increment until player can shoot again
	if(shoot_timer < shoot_speed)	
		shoot_timer += Time.deltaTime;
	
	//#if UNITY_EDITOR
	if(health <= 0)
		lose();
	//#endif
}

//Coroutine plays audio, yields for 4 seconds then resumes to quit app.
function lose(){
	Debug.Log('Player has lost quiting Application.');
	//pause main audio
	audio.Pause();
	//play death audio
	audio.PlayOneShot(death_audio);
	//yield to not quit immediately
	yield WaitForSeconds(4.5f);
	//quit
	Application.Quit();
}