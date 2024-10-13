import * as path from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { fileURLToPath } from 'url';

// custom
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {
    // Place your custom options for app below here.
}

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    // Place here your custom code!

    // custom
    // Add schema validator and serializer
    void fastify.setValidatorCompiler(validatorCompiler);
    void fastify.setSerializerCompiler(serializerCompiler);

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: opts,
        forceESM: true
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'app/routes'),
        ignoreFilter: (path) => path.startsWith('/common'),
        options: { ...opts, prefix: '/api' },
        forceESM: true
    });
};

export default app;
export { app, options };
