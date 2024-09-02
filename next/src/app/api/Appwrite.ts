import { Client, Databases } from 'node-appwrite';

const DATABASE_ID = "66d16a5f001d5cd4eb4a"; // Not sensitive so can put it here
const USERS_ID = "66d16aa6002e12b37ed9";
const PROJECTS_ID = "66d16b0e000ccca42f56"

const get_client = () => new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66d169fe003c4ce8ac2b')
    .setKey(process.env.APPWRITE_SECRET??"") // TODO: Throw a bug if not provided

export {
    get_client, DATABASE_ID, USERS_ID, PROJECTS_ID
}