import { AppInterfaces } from '@/app/interfaces';

export class Example {
    constructor(protected readonly selfRepo: AppInterfaces.Example) {}

    async base(): Promise<string> {
        return 'This is an example!';
    }

    async withAuth(): Promise<string> {
        return 'Authorized!';
    }

    async withDb(): Promise<string> {
        return `Total Users: ${await this.selfRepo.countAllUsers()}`;
    }
}
