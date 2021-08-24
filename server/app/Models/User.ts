import { DateTime } from "luxon"
import Hash from "@ioc:Adonis/Core/Hash"
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm"
import History from "./History"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nick: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => History)
  public histories: HasMany<typeof History>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
