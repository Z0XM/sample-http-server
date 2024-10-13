import fp from 'fastify-plugin';

import { onRequestHookHandler } from 'fastify';

import { fastifyRequestContext } from '@fastify/request-context';

export default fp(async (fastify) => {
    fastify.register(fastifyRequestContext);

    fastify.decorate('initializeRequestContext', async function (request, reply) {
        return;
    });
});

declare module '@fastify/request-context' {
    interface RequestContextData {}
}

declare module 'fastify' {
    export interface FastifyInstance {
        initializeRequestContext: onRequestHookHandler;
    }
}
