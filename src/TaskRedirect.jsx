import { useParams, Navigate } from 'react-router-dom';

const TaskRedirect = () => {
    const { id } = useParams();
    return <Navigate to={`/task/${id}`} replace />;
};

export default TaskRedirect;
