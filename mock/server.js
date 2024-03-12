const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const { homepageData } = require("./data");
const cors = require('cors');

const typeDefs = gql(require("fs").readFileSync("mock/schema.graphql", "utf-8"));

const resolvers = {
  Query: {
    content: () => homepageData,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: {
    defaultMaxAge: 0,
    calculateHttpHeaders: false,
  },
});
const app = express();

app.use(cors());
app.options('*', cors());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server running on port ${PORT}`);
});
