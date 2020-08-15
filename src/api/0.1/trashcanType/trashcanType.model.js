// The model Objection.js uses for validation
const { Model } = require('objection');

const schema = require('./trashcanType.schema.json');
const tableNames = require('../../../constants/tableNames');

class TrashcanType extends Model {
  static get tableName() {
    return tableNames.trashcan_type;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = TrashcanType;
