import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BookingsController {
    /**
   * @swagger
   * /api/v1/booking:
   *   get:
   *     summary: Show booking
   *     responses:
   *       200:
   *         description: Show all booking schedule
   *         example:
   *           message: sukses
   */
    public async index({response}: HttpContextContract){
        try {
            const data = await Database.from('bookings')
            .select('play_date_start','play_date_end', 'users.name as nama_user', 'fields.name as nama_field')
            .join('users','users.id','bookings.user_id')
            .join('fields','fields.id','bookings.field_id')
        return response.ok({message: "sukses", data:data})
        } catch (error) {
        return response.badRequest({message: "gagal mengambil data"})
            
        }
    }
   /**
   * @swagger
   * /api/v1/booking/:id/join:
   *  post:
   *    parameters:
   *       - name: id
   *         description: id of the user
   *         in: path
   *         required: true
   *         type: number
   *    summary: Join booking
   *    description: Join on a booking schedule
   *    responses:
   *      200:
   *        description: Validated
   */
    public async joinBooking({params,request,response}: HttpContextContract){
        try {
            await Database.table('user_has_bookings').insert({
                user_id: request.input('user_id'),
                booking_id: params.id
            });
            return response.ok({message: "sukses join!"})
        } catch (error) {
            return response.badRequest({message: "gagal join booking!"})
        }
    }
     /**
   * @swagger
   * /api/v1/booking/:id:
   *   get:
   *     summary: Show booking with id
   *     responses:
   *       200:
   *         description: Show spesific booking data with id
   *         example:
   *           message: sukses
   */
    public async showBooking({params,response}: HttpContextContract){
       try {
        const bookings = await Database.from('bookings')
        .select('play_date_start','play_date_end','users.name as nama_user')
        .join('users','users.id','bookings.user_id')
        .join('fields','fields.id','bookings.field_id')
        .where({'bookings.id': params.id});
        const participant = await Database.from('user_has_bookings')
        .join('users','users.id','user_has_bookings.user_id')
        .select('users.name').where({booking_id:params.id})
        bookings[0]["participant"] = participant
        return response.ok({message: "sukses", data:bookings})
       } catch (error) {
        return response.badRequest({message: error.message})
       }
    }
   /**
   * @swagger
   * /api/v1/booking/:id/unjoin:
   *  post:
   *    parameters:
   *       - name: id
   *         description: id of the user
   *         in: path
   *         required: true
   *         type: number
   *    summary: Cancel join booking
   *    description: Cancel join on a booking schedule
   *    responses:
   *      200:
   *        description: Validated
   */
    public async unjoinBooking({params,request,response}: HttpContextContract){
        try {
            await Database.from('user_has_bookings').where({booking_id: params.id}).where({user_id: request.input('user_id')}).delete()
            return response.ok({message: "sukses batal join!"})
        } catch (error) {
            return response.badRequest({message: "gagal batal join!"})
        }
    }

     /**
   * @swagger
   * /api/v1/schedule:
   *   get:
   *     summary: Show booking with id
   *     responses:
   *       200:
   *         description: Show spesific booking data with id
   *         example:
   *           message: sukses
   */
    public async schedules({auth,response}: HttpContextContract){
        const data = await Database.from('user_has_bookings')
        .join('bookings','bookings.id','user_has_bookings.booking_id')
        .select('play_date_start','play_date_end')
        .where({'user_has_bookings.user_id': auth.user.id })

        response.ok({message: "sukses", data: data})
    }
}
