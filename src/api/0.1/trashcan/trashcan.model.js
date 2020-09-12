// The model Objection.js uses for validation
const { Model } = require('objection');

// For relation mapping
const City = require('../city/city.model');
const TrashcanType = require('../trashcanType/trashcanType.model');

const schema = require('./trashcan.schema.json');
const tableNames = require('../../../constants/tableNames');

class Trashcan extends Model {
  static get tableName() {
    return tableNames.trashcan;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    return {
      city: {
        // Relation: ONE city has MANY trashcans
        // so a trashcan belongs to a city
        relation: Model.BelongsToOneRelation,
        modelClass: City,
        // Property by which to join them
        join: {
          from: 'city.id',
          to: 'trashcan.city_id'
        }
      },
      type: {
        // Relation: ONE type has MANY trashcans
        // so a trashcan belongs to one type
        relation: Model.BelongsToOneRelation,
        modelClass: TrashcanType,
        // Property by which to join them
        join: {
          from: 'trashcan_type.id',
          to: 'trashcan.type_id'
        }
      }
    };
  }
}

module.exports = Trashcan;
