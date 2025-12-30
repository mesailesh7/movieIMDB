import { Client, Databases, ID, Query, TablesDB } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLEID;

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

// const database = new Databases(client);
const database = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  //   console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
  //1. use appwrite sdk to check if the search term exists in the database
  try {
    // const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    //   Query.equal("searchTerm", searchTerm),
    // ]);

    const result = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", searchTerm)],
    });

    console.log(result);

    //2. if it does, update the count
    if (result.rows && result.rows.length > 0) {
      const doc = result.rows[0];

      await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: doc.$id,
        data: { count: doc.count + 1 },
      });
      //3. if it doesn't create a new document with the search term and count as 1
    } else {
      // await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique, {
      //   searchTerm,
      //   count: 1,
      //   movie_id: movie.id,
      //   poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      // });

      await database.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
