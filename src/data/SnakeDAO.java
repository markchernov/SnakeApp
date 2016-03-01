
package data;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import data.Game;

@Transactional

public class SnakeDAO {

	@PersistenceContext

	private EntityManager em;

	public Game getGameById(String gameid) {

		int id = Integer.parseInt(gameid.trim());

		Game game = em.find(Game.class, id);

		System.out.println(game);

		return game;

	}

	public List<Game> getAllGames() {

		List<Game> games = em.createNamedQuery("Game.getAllGames").getResultList();

		return games;

	}
	

	

	public Game createGame(Game g) {

		g.setStartdate(new Date());

		em.merge(g);

		em.persist(g);

		Game persistedGame = (Game) em.createNamedQuery("Game.getLastGameById").getSingleResult();

		return persistedGame;

	}

	public Game deleteGame(int id) {

		Game g = em.find(Game.class, id);

		em.remove(g);

		return g;

	}

	public Game updateGame(Game g) {

		em.merge(g);

		//em.persist(e);

		int id = g.getId();

		Game persistedGame = em.find(Game.class, id);

		return persistedGame;

	}
	
	
	public Player getPlayerById(String playerid) {

		int id = Integer.parseInt(playerid.trim());

		Player player = em.find(Player.class, id);

		System.out.println(player);

		return player;

	}

	public List<Player> getAllPlayers() {

		List<Player> players = em.createNamedQuery("Player.getAllGames").getResultList();

		return players;

	}
	

	

	public Player createPlayer(Player p) {

		
		em.merge(p);

		em.persist(p);

		Player persistedPlayer = (Player) em.createNamedQuery("Player.getLastPlayerById").getSingleResult();

		return persistedPlayer;

	}

	public Player deletePlayer(int id) {

		Player p = em.find(Player.class, id);

		em.remove(p);

		return p;

	}

	public Player updatePlayer(Player p) {

		em.merge(p);

		//em.persist(e);

		int id = p.getId();

		Player persistedPlayer = em.find(Player.class, id);

		return persistedPlayer;

	}
	
	

}
