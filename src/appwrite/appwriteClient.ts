import { Client, Account } from 'appwrite';
import { config } from './config';

export const client = new Client();

client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

console.log('config.appwriteProjectId', config.appwriteProjectId)

export const account = new Account(client);
export { ID } from 'appwrite';
