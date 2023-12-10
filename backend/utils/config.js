import 'dotenv/config';

const PORT = process.env.PORT;
const HASH_COMPLEXITY = process.env.HASH_COMPLEXITY;
const SECRET = process.env.SECRET;

const URI = process.env.NODE_ENV === 'test' ? process.env.TEST_URI : process.env.URI;

export { HASH_COMPLEXITY, PORT, SECRET, URI };
