import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from "./LocaleState"

export default new ApolloClient({
     uri: "https://herokuprisserver.herokuapp.com",
     //uri: "http://hellojw.net:9333",
     //uri: "http://localhost:4000",
     clientState:{
          defaults,
          resolvers
     },
     headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`
     }
})
