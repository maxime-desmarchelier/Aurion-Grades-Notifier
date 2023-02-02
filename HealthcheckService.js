const {HealthChecksPingClient, HealthChecksApiClient} = require('healthchecks-io-client');

class HealthcheckService {
    static reportSuccess(uuid) {
        try {
            const client = new HealthChecksPingClient({uuid: uuid});
            client.success();
        } catch (e) {
            console.error("Warning when reporting success: " + e);
        }
    }

    static reportFail(uuid) {
        try {
            const client = new HealthChecksPingClient({uuid: uuid});
            client.fail();
        } catch (e) {
            console.error("Warning when reporting fail: " + e);
        }
    }

    static updateTimeout(uuid, timeout) {
        try {
            HealthChecksApiClient.updateCheck(uuid, {timeout: timeout});
        } catch (e) {
            console.error("Warning when updating timeout: " + e);
        }
    }
}

module.exports = HealthcheckService;
