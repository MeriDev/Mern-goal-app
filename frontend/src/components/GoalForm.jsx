import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createGoal } from '../features/goals/goalSlice';

const GoalForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText('');
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            placeholder="Enter your goal here"
            name="text"
            id="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
