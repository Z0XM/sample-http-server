import fp from 'fastify-plugin';

import { AppRepositories } from '@/app/repository';
import { AppServices } from '@/app/services';

export default fp(async (fastify) => {
    const repos = {
        example: new AppRepositories.Example()
    };

    fastify.decorate('services', {
        example: new AppServices.Example(repos.example)
    });
});

declare module 'fastify' {
    interface FastifyInstance {
        services: {
            example: AppServices.Example;
        };
    }
}
