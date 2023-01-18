import { app } from './app.js';
import { PORT } from './core/constants.js';

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
