
import { sql } from "./database/database.js";

const create = async (userName, message) => {
    await sql`INSERT INTO messages (sender, message) VALUES (${userName}, ${message});`;
};

const findAll = async () => {
  return await sql`SELECT * FROM messages ORDER BY id DESC LIMIT 5`;
};

export { 
  create,
  findAll
};