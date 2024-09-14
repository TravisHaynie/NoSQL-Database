const { connect, connection }= require('mongoose');

connect('mongodb://localhost:27017/socialNetworkDB')

module.exports = connection;
