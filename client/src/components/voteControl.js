import React from 'react';

export default ({score, voteUp, voteDown}) => {
  return (
    <div>
      <button onClick={voteUp}>+1</button>
      {score} votes
      <button onClick={voteDown}>-1</button>
    </div>
  );
}
