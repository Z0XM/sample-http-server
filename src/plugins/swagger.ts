import fp from 'fastify-plugin';
import FastifySwagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { OpenAPIV3 } from 'openapi-types';
import { appEnv } from '@/constants/env.js';

interface OpenAPIOptions {
    app: {
        port: number;
        address?: string;
    };
    info?: OpenAPIV3.InfoObject;
    tags?: OpenAPIV3.TagObject[];
    components?: OpenAPIV3.ComponentsObject;
}

const openAPIOptions: OpenAPIOptions = {
    app: {
        port: appEnv.APP_PORT,
        address: appEnv.APP_ADDRESS
    }
};

export default fp(async (fastify) => {
    fastify.register(FastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: openAPIOptions.info,
            servers: [
                {
                    url: `http://${openAPIOptions.app.address ?? 'localhost'}:${
                        openAPIOptions.app.port
                    }`,
                    description: 'Development server'
                }
            ],
            tags: openAPIOptions.tags,
            components: openAPIOptions.components,
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            }
        },
        transform: jsonSchemaTransform
    });

    fastify.register(SwaggerUI, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) {
                next();
            },
            preHandler: function (request, reply, next) {
                next();
            }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => {
            return swaggerObject;
        },
        transformSpecificationClone: true
    });
});
