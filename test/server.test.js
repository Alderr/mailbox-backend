const { runServer, app, closeServer } = require('../server');

const chai = require('chai');
const chai_http = require('chai-http');
const expect = chai.expect;
chai.use(chai_http);

const { before, after, describe, it } = require('mocha');

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const PORT = process.env.PORT;

describe('Server executes!', () => {
    before(() => {
        return runServer(TEST_DATABASE_URL, PORT);
    });

    after(() => {
        return closeServer();
    });

    it('Should have status 200', () => {
        return chai.request(app)
            .get('/')
            .then(res => {
                expect(res).to.have.status(200);
            });
    });

});