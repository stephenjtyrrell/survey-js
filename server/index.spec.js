const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
let app;
let db;

describe('Survey API', () => {
  beforeAll((done) => {
    app = require('./index');
    db = new sqlite3.Database(':memory:');
    db.run(`CREATE TABLE IF NOT EXISTS responses (
      id TEXT PRIMARY KEY,
      response TEXT NOT NULL,
      date TEXT NOT NULL
    )`, done);
  });

  afterAll((done) => {
    db.close(done);
  });

  it('should add a response', async () => {
    const res = await request(app)
      .post('/api/response')
      .send({ foo: 'bar' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all responses', async () => {
    const res = await request(app).get('/api/response');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a response', async () => {
    const addRes = await request(app)
      .post('/api/response')
      .send({ foo: 'bar' });
    const id = addRes.body.id;
    const res = await request(app)
      .put(`/api/response/${id}`)
      .send({ foo: 'baz' });
    expect(res.statusCode).toBe(200);
  });

  it('should delete a response', async () => {
    const addRes = await request(app)
      .post('/api/response')
      .send({ foo: 'bar' });
    const id = addRes.body.id;
    const res = await request(app)
      .delete(`/api/response/${id}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 when updating non-existent response', async () => {
    const res = await request(app)
      .put('/api/response/nonexistent')
      .send({ foo: 'bar' });
    expect(res.statusCode).toBe(404);
  });

  it('should return 404 when deleting non-existent response', async () => {
    const res = await request(app)
      .delete('/api/response/nonexistent');
    expect(res.statusCode).toBe(404);
  });

  it('should return 400 for invalid JSON', async () => {
    const res = await request(app)
      .post('/api/response')
      .set('Content-Type', 'application/json')
      .send('invalid json');
    expect(res.statusCode).toBe(400);
  });
});
