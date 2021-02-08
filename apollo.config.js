module.exports = {
  client: {
    include: ["src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "Ubereats Challenge backend",
      url: "https://obscure-dawn-29050.herokuapp.com/graphql",
      // optional headers
      headers: {
        authorization: "Bearer lkjfalkfjadkfjeopknavadf",
      },
    },
  },
};
