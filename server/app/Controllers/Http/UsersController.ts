import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import User from "App/Models/User"

export default class UsersController {
  public async update({ auth, request }: HttpContextContract) {
    const authUser = await auth.authenticate()
    const user = await User.find(authUser.id)
    if (user) {
      user.nick = request.input("nick")
      user.first_name = request.input("first_name")
      user.last_name = request.input("last_name")
      user.password = request.input("password")
      if (await user.save()) {
        return user
      }
      return // 422
    }
    return // 401
  }
}
