import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal, editGoal } from '../features/goals/goalSlice';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const [newText, setNewText] = useState(goal.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = event => {
    setNewText(event.target.value);
  };
  const cancelHandler = () => {
    setNewText(goal.text);
    setIsEditing(false);
  };

  const submiHandler = e => {
    e.preventDefault();
    dispatch(
      editGoal({
        id: goal._id,
        text: newText,
      })
    );
    setIsEditing(false);
  };

  return (
    <div className="goal">
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
      <button onClick={() => setIsEditing(true)} className="edit">
        ✎
      </button>
      {!isEditing ? (
        <div>
          <div>{new Date(goal.createdAt).toLocaleDateString('fr-fr')}</div>
          <h2>{goal.text}</h2>
        </div>
      ) : (
        <form onSubmit={submiHandler}>
          <input
            type="text"
            className="edit-input"
            placeholder="Edit"
            value={newText}
            onChange={handleInputChange}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-sm" type="submit">
              Edit
            </button>
            <button className="btn-sm" type="button" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GoalItem;
