import {FastifyRequest,FastifyReply} from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export async function register (req:FastifyRequest, reply:FastifyReply) {
    const registerBodySchama =  z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8)
            .refine((password) => /[A-Z]/.test(password), {
            message: 'A senha deve conter pelo menos uma letra maiúscula',
          })
          .refine((password) => /[a-z]/.test(password), {
            message: 'A senha deve conter pelo menos um número',
          })
          .refine((password) => /[0-9]/.test(password), {
            message: 'A senha deve conter pelo menos um número',
          })
          .refine((password) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password), {
            message: 'A senha deve conter pelo menos um caractere especial',
          })
    })

    const {name,email,password} = registerBodySchama.parse(req.body);

    const password_hash = await hash(password,6);

    const userWithSameEmail = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(userWithSameEmail){
        return reply.code(409).send("email ja cadastrado")
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })


    return reply.code(201).send("usuario criando com sucesso")


}