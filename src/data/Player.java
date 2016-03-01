package data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "Players")

@NamedQueries({
	    @NamedQuery(name = "Event.getLastEventById", query = "select p from Player p where p.id = id"),
		@NamedQuery(name = "Player.getLastPlayer", query = "select p from Player p where p.id = (SELECT MAX(p2.id)from Player p2)"),
		@NamedQuery(name = "Player.getAllPlayers", query = "select p from Player p"), })


public class Player {

	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "playerid")
	private int id;

	@Column(name = "name")
	private String name;
	
	
	private int score;


	public Player() {};
	
	public Player(int id, String name, int score) {
		super();
		this.id = id;
		this.name = name;
		this.score = score;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getScore() {
		return score;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setScore(int score) {
		this.score = score;
	}; 
	
	
	
	
	
	
	
}
