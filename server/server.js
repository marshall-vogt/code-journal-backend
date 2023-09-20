/* eslint-disable no-unused-vars -- Remove me */
import 'dotenv/config';
import pg from 'pg';
import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());

app.get('/api/entries', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "entries"
        order by "entryId" desc
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/entries', async (req, res, next) => {
  try {
    const { title, notes, photoUrl } = req.body;
    validateBody(title, notes, photoUrl);
    const sql = `
      insert into "entries" ("title", "notes", "photoUrl")
        values ($1, $2, $3)
        returning *
    `;
    const params = [title, notes, photoUrl];
    const result = await db.query(sql, params);
    res.json(result.rows);
    console.log(result);
  } catch (err) {
    next(err);
  }
});

app.put('/api/entries/:entryId', async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    const { title, notes, photoUrl } = req.body;
    validateEntryId(entryId);
    validateBody(title, notes, photoUrl);
    const sql = `
      update "entries"
        set "title" = $1,
            "notes" = $2,
            "photoUrl" = $3
        where "entryId" = $4
        returning *
    `;
    const params = [title, notes, photoUrl, entryId];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (!entry)
      throw new ClientError(404, `cannot find entry with entryId: ${entryId}`);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/entries/:entryId', async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    validateEntryId(entryId);
    const sql = `
      delete
        from "entries"
        where "entryId" = $1
    `;
    const params = [entryId];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (!entry)
      throw new ClientError(404, `cannot find entry with entryId: ${entryId}`);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

function validateBody(title, notes, photoUrl) {
  if (!title) throw new ClientError(400, 'title is required');
  if (!notes) throw new ClientError(400, 'notes is required');
  if (!photoUrl) throw new ClientError(400, 'photoUrl is required');
}

function validateEntryId(entryId) {
  if (Number.isNaN(entryId) || entryId <= 0)
    throw new ClientError(400, 'entryId is not a positive integer');
}

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
