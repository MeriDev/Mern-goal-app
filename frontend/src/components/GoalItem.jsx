import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleDateString('fr-fr')}</div>x
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
};

export default GoalItem;
