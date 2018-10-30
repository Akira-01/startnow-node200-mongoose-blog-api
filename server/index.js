const server = require('./app');





server.listen(process.env.PORT || 5000, function() {
  console.log(`Server is listening on https://localhost5000`)
})

