import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';
import { appEnv } from '@/constants/env.js';
import appService from './app.js';
import { pinoLogger } from '@/common/logger.js';

const app = Fastify({
    loggerInstance: pinoLogger
});

app.register(appService);

closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
    if (err) app.log.error(err);
    await app.close();
});

app.listen({ port: appEnv.APP_PORT }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
