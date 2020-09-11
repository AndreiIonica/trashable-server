// The model Objection.js uses for validation
const { Model } = require('objection');

// For relation mapping
const County = require('../county/county.model');

const schema = require('./city.schema.json');
const tableNames = require('../../../constants/tableNames');

class City extends Model {
  static get tableName() {
    return tableNames.city;
  }

  static get jsonSchema() {
    return schema;
  }

  // TODO: refactor this
  static get relationMappings() {
    return {
      county: {
        // Relation: ONE counnty has MANY cities
        relation: Model.BelongsToOneRelation,
        modelClass: County,
        // Property by which to join them
        join: {
          from: 'county.id',
          to: 'city.county_id'
        }
      }
    };
  }
}

module.exports = City;
