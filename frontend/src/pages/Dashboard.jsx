import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getGoals } from '../features/goals/goalSlice';

import GoalForm from '../components/GoalForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  // const { goals } = useSelector(state => state.goals);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // dispatch(getGoals());
  }, [user, navigate, dispatch]);

  return (
    <>
      <section className="heading">
        <h1> Welcome {user && user.name}, </h1>
        <p>Goals Dashboard</p>
        <GoalForm />
        {/* {goals.map(goal => (
        <ul className="goals">
          <li className="goal" key={goal._id}>
            {goal}
          </li>
        </ul>
      ))} */}
      </section>
    </>
  );
};

export default Dashboard;
