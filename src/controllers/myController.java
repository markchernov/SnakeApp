
package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import data.Game;
import data.Player;
import data.SnakeDAO;

@RestController
public class myController {

	@Autowired
	SnakeDAO snakeDao;

	// get game by passing in id

	@RequestMapping(path = "game/{gameid}", method = RequestMethod.GET)

	public Game getGameByID(@PathVariable("gameid") String gameid) {

		Game game = snakeDao.getGameById(gameid);

		return game;
	}

	// get all games in a table

	@RequestMapping(path = "games", method = RequestMethod.GET)

	public List<Game> getAllGames() {

		List<Game> allgames = snakeDao.getAllGames();

		return allgames;
	}

	
	// get all games by player

		@RequestMapping(path = "games/{playerid}", method = RequestMethod.GET)

		public List<Game> getAllGamesByPlayer(@PathVariable("playerid") String playerid) {

			List<Game> allgamesbyplayer = snakeDao.getAllGamesByPlayer(playerid);

			return allgamesbyplayer;
		}
	
	
	
	

	// create new game 

	@RequestMapping(path = "newgame", method = RequestMethod.PUT)

	public Game createNewGame(@RequestBody Game game) {

		Game createdGame = snakeDao.createGame(game);

		return createdGame;
	}

	// delete game by id

	@RequestMapping(path = "deletegame/{gameid}", method = RequestMethod.DELETE)

	public Game deleteGame(@PathVariable("gameid") String gameid) {

		int gameID = Integer.parseInt(gameid);
		
		Game deletedGame = snakeDao.deleteGame(gameID);

		return deletedGame;
	}

	// update game by id

	@RequestMapping(path = "updategame", method = RequestMethod.POST)

	public Game updateGame(@RequestBody Game game) {

		Game updatedGame = snakeDao.updateGame(game);

		return updatedGame;
	}

	
	// ---------------------------   PLAYER METHODS --------------------------
	
	
	// get player by passing in id

		@RequestMapping(path = "player/{playerid}", method = RequestMethod.GET)

		public Player getPlayerByID(@PathVariable("playerid") String playerid) {

			Player player = snakeDao.getPlayerById(playerid);

			return player;
		}

		// get all players in a table

		@RequestMapping(path = "players", method = RequestMethod.GET)

		public List<Player> getAllPlayers() {

			List<Player> allplayers = snakeDao.getAllPlayers();

			return allplayers;
		}

		

		// create new player 

		@RequestMapping(path = "newplayer", method = RequestMethod.PUT)

		public Player createNewPlayer(@RequestBody Player player) {

			Player createdPlayer = snakeDao.createPlayer(player);

			return createdPlayer;
		}

		// delete player by id

		@RequestMapping(path = "deleteplayer/{playerid}", method = RequestMethod.DELETE)

		public Player deletePlayer(@PathVariable("playerid") String playerid) {

			int playerID = Integer.parseInt(playerid);
			
			Player deletedPlayer = snakeDao.deletePlayer(playerID);

			return deletedPlayer;
		}

		// update player by id

		@RequestMapping(path = "updateplayer", method = RequestMethod.POST)

		public Player updatePlayer(@RequestBody Player player) {

			Player updatedPlayer = snakeDao.updatePlayer(player);

			return updatedPlayer;
		}
}

