import { useMutation, useQuery } from '@apollo/client';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import { IEmployee } from '../../types/interface';
import style from './style.module.css';
import { AiOutlineUserAdd } from "react-icons/ai";
import { CREATE_EMPLOYEE, GET_EMPLOYEES } from '../../GraphQL/Employee';
import { Status } from '../../types/enum';



const statuses = [Status.Working, Status.OnVacation, Status.LunchTime, Status.BusinessTrip];

function DashboardEmployeeList() {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);

  const handleAddEmployee = async () => {
    let randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    randomStatus = randomStatus.split(' ').join('') as Status;
    const randomName = `New Employee`;
    const randomImage = '/assets/image7.webp';

    try {
      await createEmployee({
        variables: {
          name: randomName,
          status: randomStatus,
          image: randomImage,
        },
      });
      refetch(); // Refetch to update the employee list
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={style.dashboard}>
      <div className={style.dashboardContent}>
        <button onClick={handleAddEmployee}>Add New Employee <AiOutlineUserAdd size={30} /></button>
        <div className={style.employeeList}>
          {data.getEmployees.map((employee: IEmployee) => (
            <EmployeeCard employee={employee} key={employee.id} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployeeList;
