import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Player API', () => {
    it('POST /api/player - create a player', () => {
      return request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'player1' })
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBe('player1');
          expect(res.body.rank).toBe(400);
        });
    });

    it('GET /api/player - list players', () => {
      return request(app.getHttpServer())
        .get('/api/player')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('GET /api/player/:id - get a player', async () => {
      await request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'player2' });

      return request(app.getHttpServer())
        .get('/api/player/player2')
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe('player2');
          expect(res.body.rank).toBe(400);
        });
    });

    it('POST /api/player - reject duplicate player', async () => {
      await request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'duplicate' });

      return request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'duplicate' })
        .expect(409);
    });

    it('DELETE /api/player/:id - remove a player', async () => {
      await request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'toDelete' });

      await request(app.getHttpServer())
        .delete('/api/player/toDelete')
        .expect(200);

      return request(app.getHttpServer())
        .get('/api/player/toDelete')
        .expect(404);
    });
  });

  describe('Match API', () => {
    beforeEach(async () => {
      // Create two players for match tests
      await request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'alice' });
      await request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'bob' });
    });

    it('POST /api/match - create a match', () => {
      return request(app.getHttpServer())
        .post('/api/match')
        .send({ winner: 'alice', loser: 'bob', draw: false })
        .expect(201)
        .expect((res) => {
          expect(res.body.winner).toBe('alice');
          expect(res.body.loser).toBe('bob');
          expect(res.body.draw).toBe(false);
        });
    });

    it('GET /api/match - list matches', () => {
      return request(app.getHttpServer())
        .get('/api/match')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('POST /api/match - reject invalid players', () => {
      return request(app.getHttpServer())
        .post('/api/match')
        .send({ winner: 'unknown1', loser: 'unknown2', draw: false })
        .expect(404);
    });

    it('POST /api/match - create a draw', () => {
      return request(app.getHttpServer())
        .post('/api/match')
        .send({ winner: 'alice', loser: 'bob', draw: true })
        .expect(201)
        .expect((res) => {
          expect(res.body.draw).toBe(true);
        });
    });
  });

  describe('Ranking API', () => {
    beforeEach(async () => {
      // Create players for ranking tests
      await request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'player_a' });
      await request(app.getHttpServer())
        .post('/api/player')
        .send({ id: 'player_b' });
    });

    it('GET /api/ranking - get current ranking', () => {
      return request(app.getHttpServer())
        .get('/api/ranking')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('rank');
        });
    });

    it('GET /api/ranking - ranking sorted by rank descending', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/ranking')
        .expect(200);

      const ranks = response.body.map((p: any) => p.rank);
      for (let i = 0; i < ranks.length - 1; i++) {
        expect(ranks[i]).toBeGreaterThanOrEqual(ranks[i + 1]);
      }
    });
  });
});
