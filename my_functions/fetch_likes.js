// Credit to Josh Comeau for coming up with the idea - Edited by Abhinaba
const faunadb = require('faunadb');
exports.handler = async (event) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNAdj_SECRET_KEY,
  });

  const { slug } = event.queryStringParameters;
  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Article slug not provided',
      }),
    };
  }

  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index('likes_by_slug'), slug))
  );

  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('likes'), {
        data: { slug: slug, likes: 0 },
      })
    );
  }

  const document = await client.query(
    q.Get(q.Match(q.Index('likes_by_slug'), slug))
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      likes: document.data.likes,
    }),
  };
};