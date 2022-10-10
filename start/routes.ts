/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/verif_otp', 'AuthController.otp_verification')
}).prefix('api/v1');
Route.group(() => {
  Route.get('/venues', 'VenuesController.index')
  Route.get('/venue', 'VenuesController.index')
  Route.post('/venue', 'VenuesController.store')
  Route.get('/venue/:id/booking', 'VenuesController.show')
  Route.post('/venue/booking', 'VenuesController.newBooking')
  Route.put('/venue/:id', 'VenuesController.update')

  Route.get('/booking', 'BookingsController.index')
  Route.get('/schedule', 'BookingsController.schedules')
  Route.get('/booking/:id', 'BookingsController.showBooking')
  Route.put('/booking/:id/join', 'BookingsController.joinBooking')
  Route.put('/booking/:id/unjoin', 'BookingsController.unjoinBooking')
  
   Route.get('/', async ({ response }) => {
    return response.send({ message: 'Welcome to Adonis' })
  })
}).prefix('api/v1').middleware('auth');
