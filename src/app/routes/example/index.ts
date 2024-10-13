import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().get(
        '/',
        {
            schema: {
                description: 'Example route',
                response: { 200: z.string() }
            }
        },
        async (request, reply) => reply.send(await fastify.services.example.base())
    );

    fastify.withTypeProvider<ZodTypeProvider>().get(
        '/auth',
        {
            schema: {
                description: 'Example route with auth enabled',
                response: { 200: z.string() }
            }
        },
        async (request, reply) => reply.send(await fastify.services.example.withAuth())
    );

    fastify.withTypeProvider<ZodTypeProvider>().get(
        '/db',
        {
            schema: {
                description: 'Example route with db query',
                response: { 200: z.string() }
            }
        },
        async (request, reply) => {
            const response = await fastify.services.example.withDb();
            reply.send(response);
        }
    );
};

export default example;
