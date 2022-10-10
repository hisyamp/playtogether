import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestsController {
    
    public async hello({request, response}: HttpContextContract) {
        
        const name = request.input('name','guest')
        return response.send({message:'hello '+ name})
        
    }

	
}
