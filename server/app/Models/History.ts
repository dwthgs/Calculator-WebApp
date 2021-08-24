import { DateTime } from "luxon"
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm"
import User from "./User"

export default class History extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public expression: string

  @column()
  public result: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
