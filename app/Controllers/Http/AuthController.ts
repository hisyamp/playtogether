import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import user from 'App/Models/user';
import Mail from '@ioc:Adonis/Addons/Mail'


import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
    public async register({request,response }: HttpContextContract){
        try {
            const data = await request.validate(UserValidator);
            const code = Math.floor(1000 + Math.random() * 9000);
            data.otp = code.toString();            
            data.is_verified = 0;            
            await user.create(data);

            await Mail.send((message) => {
                message
                  .from('info@example.com')
                  .to(data.email)
                  .subject('OTP Verification!')
                  .htmlView('otp_verif', {code}));
            return response.created({message:'Berhasil Register, Segera periksa email anda!'});
        } catch (error) {
            return response.unprocessableEntity({message: error.message})
        }
    }

    public async login({request,response, auth}: HttpContextContract){
        try {
            const email = request.input('email');
            const password = request.input('password');
            console.log('token');
            const token = await auth.use('api').attempt(email,password);
            return response.ok({message: 'login sukses', token: token});
        } catch (error) {
            return response.badRequest({message: error.message})
        }
    }

    public async otp_verification({request,response}: HttpContextContract){
        try {
            const otpUser = request.input('otp')
            const dataUser = await Database.from('users').select('*').where({id: request.input('user_id')})
            // console.log('otpUser'+otpUser)
            // console.log('dataUser.otp'+dataUser[0].name)
            if(otpUser === dataUser[0].otp){
                dataUser[0].is_verified = 1;
                console.log(dataUser[0])
                await user
                .query()
                .where('id', request.input('user_id'))
                .update(dataUser[0])
                return response.ok({message: 'Verifikasi Berhasil'});
            }else{
                return response.badRequest({message: 'Verifikasi Gagal'});
            }
        } catch (error) {
            return response.badRequest({message: error.message});
            
        }
    }
}
