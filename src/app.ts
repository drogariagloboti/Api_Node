import fastify from "fastify";
import { AppRoutes } from "./http/routes/routes";
export const app = fastify();

app.register(AppRoutes)


