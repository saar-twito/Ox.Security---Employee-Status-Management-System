import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './GraphQL/schema.js';
import { resolvers } from './GraphQL/resolver.js';
import { connectDB } from './db.js';
import dotenv from 'dotenv';


dotenv.config();

// Connect to the database
connectDB();

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const PORT = process.env.PORT || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT }
})

console.log(`Server running on port: ${url}`)