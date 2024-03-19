const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid input. Please provide an array.' });
  }

  const evenNumbers = [];
  const oddNumbers = [];
  const alphabets = [];

  data.forEach(item => {
    if (typeof item === 'number') {
      if (item % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    } else if (typeof item === 'string') {
      if (/^[a-z]+$/i.test(item)) {
        alphabets.push(item.toUpperCase());
      }
    }
  });

  const userId = `john_doe_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

  res.json({
    is_success: true,
    user_id: userId,
    even_numbers: evenNumbers,
    odd_numbers: oddNumbers,
    alphabets: alphabets,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});