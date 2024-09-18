import { IEmployee } from '../../types/interface';
import { Status } from '../../types/enum';
import style from './style.module.css';
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation } from '@apollo/client';
import { CHANGE_EMPLOYEE_STATUS, DELETE_EMPLOYEE } from '../../GraphQL/Employee';


// Helper function to get the status color class
const getStatusColorClass = (status: string) => {
  switch (status) {
    case 'Working':
      return style.working;
    case 'OnVacation':
      return style.onVacation;
    case 'LunchTime':
      return style.lunchTime;
    case 'BusinessTrip':
      return style.businessTrip;
    default:
      return '';
  }
};

const EmployeeCard = ({ employee, refetch }: { employee: IEmployee, refetch: () => void }) => {
  const { id, name, status, image } = employee;

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [updateEmployeeStatus] = useMutation(CHANGE_EMPLOYEE_STATUS);

  const handleDelete = async () => {
    try {
      await deleteEmployee({ variables: { id } });
      refetch(); // Refetch the employee list after deletion
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value.split(' ').join('') as Status;
    try {
      await updateEmployeeStatus({ variables: { id, status: newStatus } });
      refetch();
    } catch (error) {
      console.error('Failed to change employee status:', error);
    }
  };

  return (
    <div className={style.card}>
      <button
        title="Delete Employee"
        aria-label="Delete Employee"
        onClick={handleDelete}
        className={style.deleteButton}
      >
        {<AiOutlineDelete size={25} />}
      </button>
      <div className={style.cardContent}>
        <img src={image} alt={`${name} profile`} />
        <div>
          <h3>{name}</h3>
          <div className={style.statusIndicator}>
            <div className={`${style.circle} ${getStatusColorClass(status)}`}></div>
            <select onChange={handleStatusChange} defaultValue={Status[status as keyof typeof Status]}>
              {Object.values(Status).map((key) => (
                <option key={key} value={Status[key as keyof typeof Status]}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
