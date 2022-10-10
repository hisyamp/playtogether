import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_has_bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      .unsigned().references('users.id').onDelete('CASCADE')
      table.integer('booking_id')
      .unsigned().references('bookings.id').onDelete('CASCADE')
      table.index('user_id','fk_user_has_bookings_users1_idx')
      table.index('booking_id','fk_user_has_bookings_bookings1_idx')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
