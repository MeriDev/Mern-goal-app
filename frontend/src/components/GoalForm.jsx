import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createGoal } from '../features/goals/goalSlice';
import Spinner from './Spinner';

const GoalForm = () => {
  const dispatch = useDispatch();

  // const { isLoading } = useSelector(state => state.goals);

  const [text, setText] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    dispatch(createGoal(text));
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
