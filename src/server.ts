import { app } from "./app";
import { env } from "./env";


if (env.NODE_ENV === 'prod') {
    app.listen({
        host:'0.0.0.0',
        port:env.PORT,
    }).then(
        ()=>{
            console.log("rodando...")
        })
}else {
    app.listen({
        host:'0.0.0.0',
        port:env.PORT,
    
    }).then(
        ()=>{
            console.log(`Servidor de desenvolvimento (${env.NODE_ENV}) rodando na porta ${env.PORT}`);
        })
}