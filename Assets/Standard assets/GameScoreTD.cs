using UnityEngine;
using System.Collections.Generic;


public class GameScoreTD : MonoBehaviour
{
	static GameScoreTD instance;
	
	
	static GameScoreTD Instance
	{
		get
		{
			if (instance == null)
			{
				instance = (GameScoreTD)FindObjectOfType (typeof (GameScoreTD));
			}
			
			return instance;
		}
	}
	
	
	void OnApplicationQuit ()
	{
		instance = null;
	}
	
	
	public string playerLayerName = "Player", enemyLayerName = "CarneFresca";
	
	int monete = 10;
	int deaths = 0;
	Dictionary<string, int> kills = new Dictionary<string, int> ();
	float startTime = 0.0f;
	
	
	public static int Deaths
	{
		get
		{
			if (Instance == null)
			{
				return 0;
			}
			
			return Instance.deaths;
		}
	}
	
	
	#if !UNITY_FLASH
		public static ICollection<string> KillTypes
		{
			get
			{
				if (Instance == null)
				{
					return new string[0];
				}
				
				return Instance.kills.Keys;
			}
		}
	#endif
	
	
	public static int GetKills (string type)
	{
		if (Instance == null || !Instance.kills.ContainsKey (type))
		{
			return 0;
		}
		
		return Instance.kills[type];
	}
	
	
	public static float GameTime
	{
		get
		{
			if (Instance == null)
			{
				return 0.0f;
			}
			
			return Time.time - Instance.startTime;
		}
	}
	
	public static int Monete
	{
		get
		{
			if (Instance == null)
			{
				return 610;
			}
			
			return Instance.monete;
		}
	}
	
	
	public static void RegisterDeath (GameObject deadObject)
	{
		if (Instance == null)
		{
			Debug.Log ("Game score not loaded");
			return;
		}
		
		int
			playerLayer = LayerMask.NameToLayer (Instance.playerLayerName),
			enemyLayer = LayerMask.NameToLayer (Instance.enemyLayerName);
			
		if (deadObject.layer == playerLayer)
		{
			Instance.deaths++;
		}
		else if (deadObject.layer == enemyLayer)
		{Instance.monete = Instance.monete+6;
			Instance.kills[deadObject.name] = Instance.kills.ContainsKey (deadObject.name) ? Instance.kills[deadObject.name] + 1 : 1;
			if (deadObject.name == "EnemyMechWithNoiseE"){
				Instance.monete = Instance.monete+6;
			}			
		}
	}
	
	
	void OnLevelWasLoaded (int level)
	{
		if (startTime == 0.0f)
		{
			startTime = Time.time;
		}
	}
	
	public static void TogliMonete (int prezzo)
	{
		if (Instance == null)
		{
			Debug.Log ("GameScore non caricato");
			return;
		}
		
		Instance.monete = Instance.monete - prezzo;
		if (Instance.monete < 0){
		Instance.monete = 0;
		}
	}
	
	public static void AggiungiMonete (int prezzo)
	{
		if (Instance == null)
		{
			Debug.Log ("GameScore non caricato");
			return;
		}
		Instance.monete = Instance.monete + prezzo;
	}
	
}