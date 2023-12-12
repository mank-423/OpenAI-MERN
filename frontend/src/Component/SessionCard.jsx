import React from 'react';

const SessionCard = ({ sessionId, startTime, onClick }) => {
  return (
    <div
      className='session-card p-4 border rounded-md mb-4 bg-gray-100 cursor-pointer'
      onClick={() => onClick(sessionId)}
    >
      <p className='text-black font-semibold'>Session ID: {sessionId}</p>
      <p className='text-gray-500'>{`Start Time: ${new Date(startTime).toLocaleString()}`}</p>
    </div>
  );
};

export default SessionCard;
