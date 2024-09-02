import { listSpaces, createRepo } from "@huggingface/hub";
import type { RepoId, Credentials } from "@huggingface/hub";
import logger from "../winstonlogger";

const HF_USERNAME = "leeminwaan"
const HF_TOKEN = process.env.HF_TOKEN;
const credentials: Credentials = {
    accessToken: HF_TOKEN??""
};


/**
 * Generates a random string of characters of length `length`.
 * The string is composed of letters and numbers.
 *
 * @param {number} length - The length of the string to generate
 * @returns {string} A random string of characters of length `length`
 */
function generateID(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const list_container = async () => {
    logger.verbose("LIST API CALLED")
    const spaces = await listSpaces({
        credentials,
    });

    return spaces;
}

const create_container = async (container_name: string, username: string) => {
    logger.verbose("Creating new container")

    try {

        let repo_id = generateID(16);
        
        await createRepo({
            credentials,
            repo: HF_USERNAME + "/" + repo_id,
        })

        return repo_id
    } catch(e) {
        logger.error("Fail to create new container")
        logger.error(e)
    } finally {
        return null
    }
}

export {
    list_container,
    create_container
}