
package data;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "Games")

@NamedQueries({

		@NamedQuery(name = "Event.getLastGame", query = "select g from Game g where g.id = (SELECT MAX(g2.id)from Game g2)"),
		@NamedQuery(name = "Event.getAllGames", query = "select g from Game g"), })

public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "gameid")
	private int id;

	private Player player;

	private Date startdate;

	private Date endtdate;

	public Game() {
	}

	public int getId() {
		return id;
	}

	public Player getPlayer() {
		return player;
	}

	public Date getStartdate() {
		return startdate;
	}

	public Date getEndtdate() {
		return endtdate;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public void setEndtdate(Date endtdate) {
		this.endtdate = endtdate;
	}

}
