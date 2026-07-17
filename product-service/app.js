const cors = require('cors'); // Add this at the top

const app = express();
app.use(cors()); // Add this before your routes!
app.use(express.json());