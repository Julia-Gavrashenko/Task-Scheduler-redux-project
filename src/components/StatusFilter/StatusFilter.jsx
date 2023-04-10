import { Button } from "components/Button/Button";
import css from "./StatusFilter.module.css";
import { useSelector } from "react-redux";
import { statusFilters } from "redux/constants";
import { getStatusfilter } from "redux/selectors";
import { useDispatch } from "react-redux";
import { setStatusFilter } from "redux/filtersSlice";

export const StatusFilter = () => {
  
  const dispatch = useDispatch();
  const filter = useSelector(getStatusfilter)
  
  const handleFilterChange = filter => dispatch(setStatusFilter(filter))


  return (
    <div className={css.wrapper}>
      <Button
        selected={filter === statusFilters.all}
        onClick={() => handleFilterChange(statusFilters.all)}
      >All</Button>
      <Button
        selected={filter === statusFilters.active}
        onClick={() => handleFilterChange(statusFilters.active)}
      >Active</Button>
      <Button
        selected={filter === statusFilters.completed}
        onClick={() => handleFilterChange(statusFilters.completed)}
      >Completed</Button>
    </div>
  );
};
