import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Histories extends BaseSchema {
  protected tableName = 'histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('expression', 255).notNullable()
      table.string('result', 255).notNullable()
      table.integer('user_id', 180).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
