import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Venue from 'App/Models/Venue';
import VenueValidator from 'App/Validators/VenueValidator';

export default class VenuesController {
  /**
   * @swagger
   * /api/v1/venue:
   *   get:
   *     summary: Show all venue
   *     responses:
   *       200:
   *         description: Show all venue data
   *         example:
   *           message: sukses
   */

  public async index({response}: HttpContextContract) {
    const allUser = await Venue.all();
        return response.ok({message: "berhasil mengambil data", data: allUser})
  }
  /**
   * @swagger
   * /api/v1/venue:
   *  post:
   *    parameters: id
   *    summary: Create new venue data
   *    description: Create new venue data
   *    requestBody:
   *      required: true
   *      content:
   *        text/plain:
   *    responses:
   *      200:
   *        description: Validated
   */
  public async store({request,response}: HttpContextContract) {
    const data = await request.validate(VenueValidator);
    await Venue.create(data)

    return response.ok({message: "data berhasil dibuat"})
  }
  /**
   * @swagger
   * /api/v1/venue/:id/booking:
   *   get:
   *     summary: Show venue
   *     responses:
   *       200:
   *         description: Show venue and its schedule
   *         example:
   *           message: sukses
   */
   
  public async show({params,response,auth}: HttpContextContract) {
    const venue = await Database.from('venues')
    .select('venues.name as nama venue','venues.address', 'venues.phone','users.name as nama_owner')
    .join('users','users.id','venues.user_id')
    .where({
      'venues.id': params.id
    })
    const field = await Database.from('fields').where({
      venue_id: params.id
    })
    const arr : number[] = [];
    if(field.length!= 0){
      field.forEach(e => {
        arr.push(e.id)
      });
    }
    const bookings = await Database.from('bookings')
    .select('play_date_start','play_date_end','users.name')
    .join('users','users.id','bookings.user_id')
    .whereIn('bookings.field_id',arr);
    
    venue[0]["jadwal"] = bookings
    response.ok({message: "sukses", data: venue})
  }
  /**
   * @swagger
   * /api/v1/booking:
   *  post:
   *    summary: Create new booking
   *    description: Create new booking on a venue
   *    requestBody:
   *      required: true
   *      content:
   *        text/plain:
   *    responses:
   *      200:
   *        description: sukses
   */
  public async newBooking({request,response}: HttpContextContract) {
    await Database.table('bookings').insert({
      play_date_start: request.input('play_date_start'),
      play_date_end: request.input('play_date_end'),
      field_id: request.input('field_id'),
      user_id: request.input('user_id'),
    })

    response.ok({message: "booking sukses"})
  }
    /**
   * @swagger
   * /api/v1/booking:
   *  put:
   *    summary: Update venue
   *    description: Update data on spesific venue
   *    requestBody:
   *      required: true
   *      content:
   *        text/plain:
   *    responses:
   *      200:
   *        description: sukses
   */
  public async update({params,request, response}: HttpContextContract) {
    try {
      const data = await request.validate(VenueValidator);
      await Venue
      .query()
      .where('id', params.id)
      .update(data)
      response.ok({
        status: "update success",
      });
    } catch (error) {
      
    }
  }

}
