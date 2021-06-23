// Credit to Josh Comeau for coming up with the idea - Edited by Abhinaba
const faunadb = require('faunadb');
exports.handler = async (event, context) => {
  const q = faunadb.query;
  const data = JSON.parse(event.body)
  const isstaging = data.staging;
  const slug = data.slug;
  const index = isstaging?'likes_by_slug':'likes_by_slug_prod'
  const db = isstaging?'likes':'likes_prod'
  const client = new faunadb.Client({
    secret: process.env.FAUNAdj_SECRET_KEY,
  });

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Article slug not provided',
      }),
    };
  }
  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index(index), slug))
  );

  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection(db), {
        data: { slug: slug, likes: 0 },
      })
    );
  }

  const document = await client.query(
    q.Get(q.Match(q.Index(index), slug))
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      likes: document.data.likes,
      context:context,
      process:process
    }),
  };
};