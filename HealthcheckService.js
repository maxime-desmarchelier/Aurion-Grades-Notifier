const {HealthChecksPingClient, HealthChecksApiClient} = require('healthchecks-io-client');

class HealthcheckService {
    validUuid = true;

    constructor(uuid) {
        this.uuid = uuid;

        try {
            this.client = new HealthChecksPingClient({uuid: uuid});
        } catch (e) {
            console.error("Warning when init healthcheck service: " + e);
            this.validUuid = false;
        }
    }

    reportSucess() {
        if (this.validUuid) this.client.success();
    }

    reportFail() {
        if (this.validUuid) this.client.fail();
    }

    updateTimeout(timeout) {
        if (this.validUuid) HealthChecksApiClient.updateCheck(this.uuid, {timeout: timeout});
    }
}

module.exports = HealthcheckService;
