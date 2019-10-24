let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Tests', () => {
    let _authToken = ''; // we will pass it to authenticated endpoints

    describe('/ -> Http', () => {
        it('should be running', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('status', true)
                    done()
                })
        })
    })

    describe('/auth -> Auth', () => {
        describe('/login -> Login', () => {
            it('should succeed', (done) => {
                chai.request(server)
                    .post('/auth/login')
                    .send({
                        email: "john_doe@gmail.com",
                        password: "123456"
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.have.property('status', true)
                        res.body.should.have.property('data')
                        res.body.data.should.have.property('token')
                        _authToken = res.body.data.token
                        done()
                    })
            }),
                it('should fail', (done) => {
                    chai.request(server)
                        .post('/auth/login')
                        .send({
                            email: "john_doe@gmail.com",
                            password: "123456123"
                        })
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('status', false)
                            res.body.should.have.property('err')
                            done()
                        })
                })
        })
    })

    describe('/sensors -> Sensors', () => {
        it('list available sensors', (done) => {
            chai.request(server)
                .get('/sensors')
                .set("auth_token", _authToken)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('status', true)
                    res.body.data.should.be.a('array');
                    done()
                })
        })
    })

    describe('/allocations -> Allocations', () => {
        it('list allocations for workout', (done) => {
            chai.request(server)
                .get('/allocations/1')
                .set("auth_token", _authToken)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('status', true)
                    res.body.data.should.be.a('array');
                    done()
                })
        }),
            it('allocate sensor for workout', (done) => {
                chai.request(server)
                    .post('/allocations')
                    .set("auth_token", _authToken)
                    .send({
                        workout_id: 1,
                        sensor_id: 4
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.have.property('status', true)
                        done()
                    })
            })
    })

    describe('/workouts -> Workouts', () => {
        it('list available workouts', (done) => {
            chai.request(server)
                .get('/workouts')
                .set("auth_token", _authToken)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('status', true)
                    res.body.data.should.be.a('array');
                    done()
                })
        }),
            it('join to workout', (done) => {
                chai.request(server)
                    .post('/workouts/join')
                    .set("auth_token", _authToken)
                    .send({
                        workout_id: 1
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.have.property('status', true)
                        done()
                    })
            })
    })
})