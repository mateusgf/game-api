import db from "./connectors/sqlite3";

export default function getDefaultDBConnector() {
  return db;
};
