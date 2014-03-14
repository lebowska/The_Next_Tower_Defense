#pragma strict


public var torrettaSfigata1 : GameObject;
public var torrettaSfigata2 : GameObject;
public var torrettaMediamenteFica1 : GameObject;
public var torrettaMediamenteFica2 : GameObject;
public var torrettaStrafica1 : GameObject;
public var torrettaStrafica2 : GameObject;

public var eliminaTorrette : GameObject;
public var digievolviTorrette : GameObject;

private var prezzoTSfigata1 : int = 20;
private var prezzoUSfigata2 : int = 14;
private var prezzoTMediamenteFica1 : int = 60;
private var prezzoUMediamenteFica2 : int = 40;
private var prezzoTStrafica1 : int = 100;
private var prezzoUStrafica2 : int = 65;

//Instantiate (Resources .Load ("PrefabName"), position , rotation )
//> Prefabs> Resources> PrefabName

private var playerTransform : Transform;
private var thisTransform : Transform;
private var centroCostruzione : Transform;
private var apriMenuTorrette : boolean;
private var apriMessaggioErrore : boolean;
private var tipoTorretta : String;
private var gradoTorretta : int;

private var tastoDigiEvolviSfigata : boolean;
private var tastoDigiEvolviMediamenteFica : boolean;
private var tastoDigiEvolviStraFica : boolean;
private var tastoUccidi : boolean;
private var tastoSfigata : boolean;
private var tastoMediamenteFica : boolean;
private var tastoStraFica : boolean;
private var tastoChiudi : boolean;
private var cuboPieno : boolean;


function Start () {
	thisTransform = this.transform;
	playerTransform = GameObject.FindWithTag("Player").transform;
//	centroCostruzione = GameObject.Find("CentroCostruzione").transform;
	cuboPieno = false;
	apriMenuTorrette = false;
	apriMessaggioErrore = false;
}

function OnMouseDown() {
	var distanzaDaGiocatore : float = Vector3.Distance(playerTransform.position, thisTransform.position);
	if (distanzaDaGiocatore > 10.0) {
		return;
	} else {			
		if (apriMessaggioErrore == true){
			apriMessaggioErrore = false;		
			return;
		}	
		apriMenuTorrette = !apriMenuTorrette;	
	}
}

function OnGUI () {
	
	if (apriMessaggioErrore)	{
		GUI.Box (Rect ((Screen.width / 2) - 93,90,185,65), "");
		GUI.Label	(Rect ((Screen.width / 2) - 58, 100, 115, 20), "Monete insufficienti");
		if (GUI.Button (Rect ((Screen.width / 2) - 24,126,55,20), "OK")) {
			apriMessaggioErrore = false;
			apriMenuTorrette = true;
		}
	}
	
	if (apriMenuTorrette) {		
		if (!cuboPieno) {
						 //((Xposizione,Yposizione,larghezza,altezza), testo)
			GUI.Box (Rect ((Screen.width / 2) - 178,(Screen.height / 2) - 223,355,106), "");			
			tastoChiudi = GUI.Button (Rect ((Screen.width / 2) + 156, (Screen.height / 2) - 223,21,21), "X");			
			tastoSfigata = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 210,200,20), "Torretta sfigata");
			tastoMediamenteFica = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 180,200,20), "Torretta mediamente Fica");
			tastoStraFica = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 150,200,20), "Torretta straFica");	
			GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 210, 100, 20), prezzoTSfigata1.ToString()+" monete");
			GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 180, 100, 20), prezzoTMediamenteFica1.ToString()+" monete");
			GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 150, 100, 20), prezzoTStrafica1.ToString()+" monete");
			
			if (tastoChiudi) {
				apriMenuTorrette = false;
			}
			if (tastoSfigata) {
				if ((GestioneMonete.monete - prezzoTSfigata1) >= 0){
					tipoTorretta = "sfigata";
					gradoTorretta = 1;
					cuboPieno = true;
					apriMenuTorrette = false;
					GestioneMonete.TogliMonete (prezzoTSfigata1);
					Spawner.Spawn (torrettaSfigata1, transform.position, Quaternion.identity);//centroCostruzione.position
//		GameObject.Find("VasodiPandora").transform.position  Quaternion.LookRotation(vasodiPandora.position)

//		Rotate the object so that the y-axis faces along the normal of the surface
//		var contact : ContactPoint = collision.contacts[0];
//		var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);
//		var pos : Vector3 = contact.point;
				}
				else {
					apriMessaggioErrore = true;
					apriMenuTorrette = false;
				}
			}							
			if (tastoMediamenteFica) {
				if ((GestioneMonete.monete - prezzoTMediamenteFica1) >= 0){
					tipoTorretta = "mediamenteFica";
					gradoTorretta = 1;					
					cuboPieno = true;
					apriMenuTorrette = false;
					GestioneMonete.TogliMonete (prezzoTMediamenteFica1);
					Spawner.Spawn (torrettaMediamenteFica1, transform.position, Quaternion.identity);
					}
				else {
					apriMessaggioErrore = true;
					apriMenuTorrette = false;
				}
			}								
			if (tastoStraFica) {
				if ((GestioneMonete.monete - prezzoTStrafica1) >= 0){
					tipoTorretta = "straFica";
					gradoTorretta = 1;					
					cuboPieno = true;
					apriMenuTorrette = false;
					GestioneMonete.TogliMonete (prezzoTStrafica1);
					Spawner.Spawn (torrettaStrafica1, transform.position, Quaternion.identity);
				}
				else {
					apriMessaggioErrore = true;
					apriMenuTorrette = false;
				}
			}			
		}
						
		else {		
			GUI.Box (Rect ((Screen.width / 2) - 178,(Screen.height / 2) - 223,355,106), "");
			tastoChiudi = GUI.Button (Rect ((Screen.width / 2) + 156, (Screen.height / 2) - 223,21,21), "X");		
			
			if (tastoChiudi) {
				apriMenuTorrette = false;
			}		
				
			if (tipoTorretta == "sfigata"){
				if (gradoTorretta == 1){
								
					tastoDigiEvolviSfigata = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 199,200,20), "DigiEvolvi in: Sfigata 2nd");
					tastoUccidi = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 162,200,20), "Uccidi");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 199, 100, 20), prezzoUSfigata2.ToString()+" monete");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 162, 100, 20), "15 monete");
														
					if (tastoDigiEvolviSfigata) {
						if ((GestioneMonete.monete - prezzoUSfigata2) >= 0){
							gradoTorretta = 2;
							apriMenuTorrette = false;
							GestioneMonete.TogliMonete (prezzoUSfigata2);
							DigiEvolvi (torrettaSfigata2);
						}
						else {
							apriMessaggioErrore = true;
							apriMenuTorrette = false;
						}
					}					
					if (tastoUccidi) {
						cuboPieno = false;
						apriMenuTorrette = false;
						GestioneMonete.AggiungiMonete (15);						
						Spawner.Spawn (eliminaTorrette, transform.position, Quaternion.identity);
//							var bullit = Instantiate (bullitTransform, transform.position, Quaternion.identity);
//							bullit.gameObject.tag = "UccidiTorretta";
					}					
				}
				else {
					tastoUccidi = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 180,200,20), "Uccidi");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 180, 100, 20), "25 monete");		
					if (tastoUccidi) {
						cuboPieno = false;
						apriMenuTorrette = false;
						GestioneMonete.AggiungiMonete (25);
						Spawner.Spawn (eliminaTorrette, transform.position, Quaternion.identity);
					}					
				}
			}
			else if (tipoTorretta == "mediamenteFica"){
				if (gradoTorretta == 1){
				
					tastoDigiEvolviMediamenteFica = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 199,200,20), "DigiEvolvi in: MediamenteFica 2nd");
					tastoUccidi = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 162,200,20), "Uccidi");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 199, 100, 20), prezzoUMediamenteFica2.ToString()+" monete");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 162, 100, 20), "45 monete");
					
					if (tastoDigiEvolviMediamenteFica) {
						if ((GestioneMonete.monete - prezzoUMediamenteFica2) >= 0){
							gradoTorretta = 2;
							apriMenuTorrette = false;
							GestioneMonete.TogliMonete (prezzoUMediamenteFica2);
							DigiEvolvi (torrettaMediamenteFica2);
						}
						else {
							apriMessaggioErrore = true;
							apriMenuTorrette = false;
						}
					}					
					if (tastoUccidi) {
						cuboPieno = false;
						apriMenuTorrette = false;
						GestioneMonete.AggiungiMonete (45);
						Spawner.Spawn (eliminaTorrette, transform.position, Quaternion.identity);
					}				
				}
				else {
					tastoUccidi = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 180,200,20), "Uccidi");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 180, 100, 20), "75 monete");
					if (tastoUccidi) {
						cuboPieno = false;
						apriMenuTorrette = false;
						GestioneMonete.AggiungiMonete (75);
						Spawner.Spawn (eliminaTorrette, transform.position, Quaternion.identity);
					}									
				}
			}
			else if (tipoTorretta == "straFica"){
				if (gradoTorretta == 1){
					
					tastoDigiEvolviStraFica = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 199,200,20), "DigiEvolvi in: StraFica 2nd");
					tastoUccidi = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 162,200,20), "Uccidi");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 199, 100, 20), prezzoUStrafica2.ToString()+" monete");					
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 162, 100, 20), "75 monete");
					
					if (tastoDigiEvolviStraFica) {
						if ((GestioneMonete.monete - prezzoUStrafica2) >= 0){
							gradoTorretta = 2;
							apriMenuTorrette = false;
							GestioneMonete.TogliMonete (prezzoUStrafica2);
							DigiEvolvi (torrettaStrafica2);
						}
						else {
							apriMessaggioErrore = true;
							apriMenuTorrette = false;
						}
					}					
					if (tastoUccidi) {
						cuboPieno = false;
						apriMenuTorrette = false;
						GestioneMonete.AggiungiMonete (75);
						Spawner.Spawn (eliminaTorrette, transform.position, Quaternion.identity);
					}					
				}
				else {
					tastoUccidi = GUI.Button (Rect ((Screen.width / 2) - 153,(Screen.height / 2) - 180,200,20), "Uccidi");
					GUI.Label	(Rect ((Screen.width / 2) + 78, (Screen.height / 2) - 180, 100, 20), "125 monete");	
					if (tastoUccidi) {
						cuboPieno = false;
						apriMenuTorrette = false;
						GestioneMonete.AggiungiMonete (125);
						Spawner.Spawn (eliminaTorrette, transform.position, Quaternion.identity);
					}			
				}
			}								
		}			
	}
}

function DigiEvolvi(torretta : GameObject) {
	Spawner.Spawn (digievolviTorrette, transform.position, Quaternion.identity);
	yield WaitForSeconds(0.1f);
	Spawner.Spawn (torretta, transform.position, Quaternion.identity);
}
