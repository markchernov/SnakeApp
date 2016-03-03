
package data;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "games")

@NamedQueries({

		@NamedQuery(name = "Game.getLastGame", query = "select g from Game g where g.gameid = (SELECT MAX(g2.gameid)from Game g2)"),
		@NamedQuery(name = "Game.getAllGames", query = "select g from Game g"), 
		@NamedQuery(name = "Game.getAllGamesByPlayer", query = "select g from Game g where g.player = :player")})

public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "gameid")
	private int gameid;

	private Date startdate;

	private Date enddate;
	
	private int score;

	@ManyToOne
	@JoinColumn(name = "playerid" )
	
	private Player player;

	public Game() {
	}

	public int getId() {
		return gameid;
	}

	public Date getStartdate() {
		return startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public int getScore() {
		return score;
	}
	
	public void setScore(int score) {
		this.score = score;
	}
	
	public void setId(int id) {
		this.gameid = id;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public void setEnddate(Date endtdate) {
		this.enddate = endtdate;
	}

	
	public int getGameid() {
		return gameid;
	}

	public Player getPlayer() {
		return player;
	}

	public void setGameid(int gameid) {
		this.gameid = gameid;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	@Override
	public String toString() {
		return "Game [gameid=" + gameid + ", startdate=" + startdate + ", enddate=" + enddate + ", score=" + score
				+ ", player=" + player + "]";
	}

	

}
