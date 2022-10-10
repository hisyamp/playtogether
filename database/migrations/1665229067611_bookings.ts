import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('play_date_start')
      table.datetime('play_date_end')
      table.integer('user_id')
      .unsigned().references('users.id').onDelete('CASCADE')
      table.integer('field_id')
      .unsigned().references('fields.id').onDelete('CASCADE')
      table.index('user_id','fk_bookings_users1_idx')
      table.index('user_id','fk_bookings_fields1_idx')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
