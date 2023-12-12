import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Chat = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionCreated, setSessionCreated] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [aiChat, setAiChat] = useState(null);

    let navigate = useNavigate();

    const createSession = async () => {
        try {
            setLoading(true);
            setError(null);

            // Get the userId from localStorage
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError('User ID not found. Please go back to the authentication page.');
                return;
            }

            // Check if the session has already been created
            // if (!sessionCreated) {
            // Send a request to create a session
            const response = await axios.post('http://localhost:5000/api/session/create', {
                userId,
                startTime: new Date(),
            });

            if (response.status === 201) {
                console.log('Session created successfully:', response.data);
                setSessionId(response.data.data.sessionId); // Set sessionId
                setSessionCreated(true);
            } else {
                setError('Failed to create a session.');
            }
            // }
        } catch (err) {
            setError('An error occurred while creating the session.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sessionCreated) {
            alert("First create a session");
        }

        try {
            const res = await axios.post('http://localhost:5000/api/chat', { prompt });
            setResponse(res.data);
            setAiChat(res.data); // Set aiChat
        } catch (err) {
            console.error(err);
        }
    };

    const fetchExchanges = async () => {
        try {
            const userId = localStorage.getItem('userId');

            if (!userId || !sessionId) {
                console.error('User ID or Session ID is missing.');
                return;
            }

            const response = await axios.get(`http://localhost:5000/api/exchange/user/${userId}/session/${sessionId}`);
            setExchanges(response.data.data);
        } catch (err) {
            console.error('Error fetching exchanges:', err);
        }
    };

    const handleCreateSessionClick = async () => {
        // Create a new session when the submit button is clicked
        await createSession();
    }


    useEffect(() => {
        // Now you can use the sessionId and aiChat in your axios request
        if (sessionId && aiChat) {
            axios
                .post('http://localhost:5000/api/exchange/create', {
                    userId: localStorage.getItem('userId'),
                    sessionId,
                    userMessage: prompt,
                    aiMessage: aiChat,
                })
                .then((res) => {
                    console.log('Exchange created successfully:', res.data);
                    
                    //Whenever we submit new mssg
                    fetchExchanges();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        setPrompt("");
    }, [sessionId, aiChat]);

    useEffect(() => {
        if (localStorage.getItem('userId') === null) {
            navigate("/");
        }
    }, [localStorage.getItem('userId') === null])


    useEffect(() => {
        // Fetch exchanges when the component mounts or when sessionId changes
        if (sessionId) {
          fetchExchanges();
        }
      }, [sessionId]);



    return (
        <div className='w-3/4 mx-auto py-24'>
            <div className='w-full max-w-md mx-auto'>

                <button
                    onClick={handleCreateSessionClick}
                    className='w-full p-2 mb-4 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700'
                >
                    Create Session
                </button>

                <div className='exchanges-container max-h-72 overflow-y-auto'>
                    {exchanges.map((exchange, index) => (
                        <div key={index} className='exchange p-4 border rounded-md mb-4 bg-gray-100'>
                            <p className='text-black font-semibold'>User: {exchange.userMessage}</p>
                            <p className='text-green-500 font-semibold'>AI: {exchange.aiMessage}</p>
                        </div>
                    ))}
                </div>


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
                            className='w-full p-2 bg-black text-white rounded-full hover:bg-[#4c4c4c] focus:outline-none focus:ring focus:border-blue-700'
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

export default Chat;
