import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


// you would have to import / invoke this in another file
const dbOpen = {
async  openDb () {
  return open({
    filename: './controllers/database.db',
    driver: sqlite3.Database
  })
}

}

export default dbOpen;