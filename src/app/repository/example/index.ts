import { AppInterfaces } from '@/app/interfaces';

export class Example implements AppInterfaces.Example {
    async countAllUsers(): Promise<number> {
        return 1000;
    }
}
