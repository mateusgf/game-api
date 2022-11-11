import getDefaultDBConnector from "../db";

const db = getDefaultDBConnector();

// @TODO: move to migration
function setUp() {
  const sqlCreate = `CREATE TABLE IF NOT EXISTS games(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hostNickname int not null,
    guestNickname int,
    numberOfRounds int
  );`;
  db.run(sqlCreate, function(err: any) {
    if (err) console.error("Error while setting up table", err); 
  });
}
setUp();

function findAll(callback: Function) {
  return db.all("SELECT * FROM games", function(err: any, results: any) {
    return callback(results);
  });
}

function findById(id: number, callback: Function) {
  return db.all("SELECT * FROM games WHERE id = ? LIMIT 1", [id], function(err: any, result: any) {
    return callback(result ? result[0] : null);
  });
}

function createGame(hostNickname: string, numberOfRounds: number, callback: Function) {
  db.run(`INSERT INTO games(hostNickname, numberOfRounds) VALUES(?,?)`, [hostNickname, numberOfRounds], function(err: any) {
    if (err) {
      callback();
      console.log(err.message);
    }
    //@ts-expect-error
    findById(this.lastID, callback);
  });
};

function joinGame(gameId: number, nickname: string, callback: Function, cbError: Function) {
  const checkIfIsHost = (game: any) => {
    if (game.hostNickname === nickname) {
      // nickname is re-joining his game
      callback(game);
    } else {
      // nickname is joining as guest
      if (game.guestNickname && game.guestNickname !== nickname) {
        cbError("This game already have 2 players");
        return;
      }

      db.run(`UPDATE games SET guestNickname = ? WHERE id = ?`, [nickname, gameId], function(err: any) {
        if (err) {
          cbError(err.message);
          console.log(err.message);
        }
        // Refetch game with update guestNickname data;
        findById(gameId, callback);
      });
    }
  };

  findById(gameId, checkIfIsHost);
};

const repository = {
  setUp,
  findAll,
  findById,
  createGame,
  joinGame,
};

export default repository;