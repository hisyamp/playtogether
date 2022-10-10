import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fields'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',45)
      table.enu('type',[ 'soccer', 'minisoccer', 'futsal', 'basketball', 'volleyball'])
      table.integer('venue_id')
      .unsigned().references('venues.id').onDelete('CASCADE')
      table.index('venue_id','fk_fields_venues1_idx')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
