
import { error } from 'console'
import 'dotenv/config'
import {z} from 'zod'


const envSchema = z.object({
    NODE_ENV : z.enum(["dev","test","prod"]).default("dev"),
    PORT : z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error("variavel invalida",_env.error.format())
    throw new Error("error")
}

export const env = _env.data
