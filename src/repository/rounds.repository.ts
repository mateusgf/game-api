import getDefaultDBConnector from "../db";
import Game from "../models/game";

const db = getDefaultDBConnector();

// @TODO: move to migration
function setUp() {
  const sqlCreate = `CREATE TABLE IF NOT EXISTS rounds(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gameId int,
    hostAction varchar(50),
    guestAction varchar(50),
    winnerNickname varchar(255),
    winnerAction varchar(50)
  );
`;
  db.run(sqlCreate, function(err: any) {
    if (err) console.error("Error while setting up table", err); 
  });
}
setUp();

function findAllByGameId(gameId: number, callback: Function) {
  // @TODO: do not return what the action of oponent was
  return db.all(`
    SELECT 
    rounds.*,
    games.guestNickname,
    games.hostNickname
    FROM rounds 
    LEFT JOIN games on rounds.gameId=games.id
    WHERE rounds.gameId = ?
    ORDER BY rounds.id DESC
    `, [gameId], function(err: any, result: any) {

    // if hostAction && winnerNickname exists
      // update winnerNickname and winnerAction
      // return row updated!

    return callback(result);
  });
}

function createRound(callback: Function, gameId: number, hostAction?: string, guestAction?: string) {
  const sql = hostAction ? "INSERT INTO rounds(gameId, hostAction) VALUES(?,?)" : "INSERT INTO rounds(gameId, guestAction) VALUES(?,?)"
  const binds = hostAction ? [gameId, hostAction] : [gameId, guestAction];

  db.run(sql, binds, function(err: any) {
    if (err) {
      callback();
      console.log(err.message);
    }
    findAllByGameId(gameId, callback);
  });
};

function updateRound(callback: Function, id: number, gameId: number, hostAction?: string, guestAction?: string) {
  const sql = hostAction ? "UPDATE rounds SET hostAction = ? WHERE id = ?" : "UPDATE rounds SET guestAction = ? WHERE id = ?"
  const binds = hostAction ? [hostAction, id] : [guestAction, id];

  db.run(sql, binds, function(err: any) {
    if (err) {
      console.log(err.message);
    }

    // if hostAction && guestAction is present in this row, then set the winner

    db.all("SELECT * FROM rounds WHERE id = ? ORDER BY id DESC LIMIT 1", [id], function(err: any, result: any) {

      console.log("last round", result[0]);

      if (result && result[0] && result[0].hostAction && result[0].guestAction) {
        // update winner 
        const {winner, winnerAction} = Game.checkWinner(result[0].hostAction, result[0].guestAction);

        console.log("winner, anc winner action", {winner, winnerAction});

        if (winner && winnerAction) {
          let sql;
          let binds = [gameId, winnerAction, id];
          if (winner === "host") {
            sql = "UPDATE rounds SET winnerNickname = (SELECT hostNickname FROM games WHERE id = ? LIMIT 1), winnerAction = ? WHERE id = ?";
          } else if (winner === "guest") {
            sql = "UPDATE rounds SET winnerNickname = (SELECT guestNickname FROM games WHERE id = ? LIMIT 1), winnerAction = ? WHERE id = ?";
          } else if (winner === "draw") {
            sql = "UPDATE rounds SET winnerNickname = 'draw', winnerAction = 'draw' WHERE id = ?";
            binds = [id];
          }
          
          db.run(sql, binds, function(err: any) {
            if (err) {
              console.log(err.message);
            }
            findAllByGameId(gameId, callback);
          });
        }
      }
  
    });

    // findAllByGameId(gameId, callback);
  });
};

const repository = {
  setUp,
  findAllByGameId,
  createRound,
  updateRound,
};

export default repository;