// The model Objection.js uses for validation
const { Model } = require('objection');

const schema = require('./county.schema.json');
const tableNames = require('../../../constants/tableNames');

class County extends Model {
  static get tableName() {
    return tableNames.county;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = County;
