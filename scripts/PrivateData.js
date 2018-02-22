/**
 * Private Data
 *
 * @copyright: Erin Du
 * @version:   1.2.0
 *
 * @summary:   Framework Singleton Class to contain a web app
 *
 */
'use strict';

// if you export the class, you can create multiple instance
class PrivateDataManager {

    constructor() {
        this.privateData = new WeakMap();
    }

    members(key, values) {
        if (values != undefined)
            this.privateData.set(key, values);

        return this.privateData.get(key);
    }

}

// export const privateData = new PrivateDataManager();
const app = [];
app['private'] = new PrivateDataManager();
const SERVER_DIR = "server/";
const SERVER = SERVER_DIR + "simple_server.php";
