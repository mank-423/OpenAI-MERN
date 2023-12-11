import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/chat', { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='w-3/4 mx-auto py-24'>
      <div className='w-full max-w-md mx-auto'>
        <form className='text-center' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='prompt' className='block text-sm font-medium text-gray-700'>
              Just say/ask something
            </label>
            <textarea
              id='prompt'
              name='prompt'
              rows='4'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className='mt-1 p-2 block w-full border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500'
              placeholder='Type your message...'
              required
            ></textarea>
          </div>

          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700'
            >
              Submit
            </button>
          </div>
        </form>

        {response && (
          <div className='mt-8'>
            <p className='text-lg font-semibold'>Response from OpenAI:</p>
            <div className='p-4 border rounded-md bg-gray-100'>{response}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
