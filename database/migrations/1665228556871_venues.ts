import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'venues'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',45)
      table.string('address',45)
      table.string('phone',45)
      table.integer('user_id')
      .unsigned().references('users.id').onDelete('CASCADE')
      table.index('user_id','fk_venues_users1_idx')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
