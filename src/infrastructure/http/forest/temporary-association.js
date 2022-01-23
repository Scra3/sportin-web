const { collection } = require('forest-express-sequelize');

collection('TemporaryAssociation', {
  actions: [{
    name: 'publish'
  }],
});
