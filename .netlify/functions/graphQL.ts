import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/schema";
import serverless from "serverless-http";
import { typeDefs } from '../../graphQL-server/schema';
import { resolvers } from '../../graphQL-server/resolvers';

// Initialize Express app
const app = express();

// Define GraphQL server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.createHandler({ path: "/graphql" })(app);

const netlifyPreview = process.env.DYNAMIC_ORIGIN;

// Add CORS and body parsing middleware for GraphQL endpoint
app.use(
  '/graphql',
  cors<cors.CorsRequest>({ origin: ['http://localhost:4200', netlifyPreview], credentials: true }),
  express.json(),
  expressMiddleware(server),
);

// Create Express router for additional routes if needed
const router = express.Router();

// Mount router under a specific path
app.use("/api/", router);

const handler = serverless(app);

export { handler };