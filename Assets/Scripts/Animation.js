/*#pragma strict

var fps : float;
var secs : float;
var textures: Texture[];

var current : int;


function Start () {

}

IEnumerator animate(){
	var stop : boolean;
	
	yield return new WaitForSeconds(secs);
	
	renderer.material.minTexture = textures[current++ % textures.length];
	
	if(!stop)
		StartCoroutine(animate);
}*/