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

// Set the CORS origin based on the environment
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://ox-security-client.onrender.com'] // Production URL
  : ['http://localhost:3000']; // Local development URL

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => ({ req }),
  cors: {
    origin: allowedOrigins,  // Dynamically allow the correct origin
    credentials: true,
  },
});

console.log(`Server running on port: ${url}`)