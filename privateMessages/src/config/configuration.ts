export default () => ({
  app: {
    cors: {
      origin: process.env.FRONT_URL || 'http://localhost:3000'
    },
    port: process.env.PORT || 5000,
  }
})