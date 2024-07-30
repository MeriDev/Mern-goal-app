import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getGoals } from '../features/goals/goalSlice';

import GoalForm from '../components/GoalForm';

import GoalItem from '../components/GoalItem';

import Spinner from '../components/Spinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    state => state.goals
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1> Welcome, {user && user.name} </h1>
        <p>Goals Dashboard</p>
        <GoalForm />
      </section>
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
