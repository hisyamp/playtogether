import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public role: string

  @column()
  public otp: string

  @column()
  public is_verified: number
  
  @beforeSave()
  public static async hashPassword (User: user) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }
}
