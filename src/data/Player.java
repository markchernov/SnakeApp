package data;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "players")

@NamedQueries({

		@NamedQuery(name = "Player.getLastPlayer", query = "select p from Player p where p.playerid = (SELECT MAX(p2.playerid)from Player p2)"),
		@NamedQuery(name = "Player.getAllPlayers", query = "select p from Player p"), })

public class Player {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "playerid")
	private int playerid;

	@Column(name = "name")
	private String name;

	@JsonIgnore
	@OneToMany(mappedBy = "player")
	private Collection<Game> games;

	public Player() {
	};

	public Player(int id, String name) {
		super();
		this.playerid = id;
		this.name = name;
		
	}

	public int getId() {
		return playerid;
	}

	public String getName() {
		return name;
	}

	public void setId(int id) {
		this.playerid = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Collection<Game> getGames() {
		return games;
	}

	public void setGames(Collection<Game> games) {
		this.games = games;
	};

}
