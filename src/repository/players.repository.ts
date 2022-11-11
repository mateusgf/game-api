import getDefaultDBConnector from "../db";
import {PlayerTypeAPIOutput} from "../types";


const db = getDefaultDBConnector();

// @TODO: move to migration
function setUp() {
  const sqlCreate = `CREATE TABLE IF NOT EXISTS players(
    nickname varchar(255) PRIMARY KEY
  );`;
  db.run(sqlCreate, function(err: any) {
    if (err) console.error("Error while setting up table", err); 
  });
}
setUp();


function findByNickname(nickname: string, callback: Function) {
  return db.all("SELECT * FROM players WHERE nickname = ? LIMIT 1", [nickname], function(err: any, result: PlayerTypeAPIOutput[]) {
    return callback(result ? result[0] : null);
  });
}

function createPlayer(nickname: string, callback: Function, cbError: Function) {
  db.run(`INSERT INTO players(nickname) VALUES(?)`, [nickname], function(err: any) {
    if (err) {
      cbError(err.message);
      console.log(err.message);
      return;
    }
    findByNickname(nickname, callback);
  });
};

const repository = {
  setUp,
  findByNickname,
  createPlayer,
};

export default repository;