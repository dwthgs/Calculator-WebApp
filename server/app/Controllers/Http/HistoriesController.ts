import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import History from "App/Models/History"

export default class HistoriesController {
  public async index({ auth }) {
    const user = await auth.use("api").authenticate()
    return await History.query().where("userId", user.id)
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.use("api").authenticate()
    const history = new History()
    history.expression = request.input("expression")
    history.result = request.input("result")
    await user.related("histories").save(history)
    return history
  }
}
