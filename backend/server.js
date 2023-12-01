const app = require('./app');
const connectDB = require('./libs/db');

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`.yellow));
