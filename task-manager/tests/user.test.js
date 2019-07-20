const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'kiran',
        email: 'kiran693kumar@gmail.com',
        password: 'kiran123'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'kiran',
            email: 'kiran693kumar@gmail.com',
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('kiran123')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'mike@example.com',
        password: 'mikepass'
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toEqual(user.tokens[1].token)
})

test('should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'somemail@example.com',
        password: 'doesnotexist'
    }).expect(400)
})

test('should get profile for authenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should not delete profile for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should delete an authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('should upload avatar image', async () => {
    const response = await request(app)
        .post('/users/me/upload')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'killi'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('killi')
})

test('should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'bang'
        })
        .expect(400)
})
