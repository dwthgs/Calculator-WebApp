import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import User from "App/Models/User"

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const nick = request.input("nick")
    const password = request.input("password")
    const token = await auth.use("api").attempt(nick, password, {
      expiresIn: "2 days",
    })

    if (!token) {
      return
    } else {
      return token.toJSON()
    }
  }
  public async register({ request, auth, response }: HttpContextContract) {
    const nick = request.input("nick")
    if (await User.findBy("nick", nick)) {
      return response.status(401).send("Nick is not available")
    }
    const password = request.input("password")
    const first_name = request.input("first_name")
    const last_name = request.input("last_name")

    const newUser = new User()
    newUser.nick = nick
    newUser.password = password
    newUser.first_name = first_name
    newUser.last_name = last_name
    await newUser.save()
    const token = await auth.use("api").login(newUser, {
      expiresIn: "2 days",
    })
    return token.toJSON()
  }
}
