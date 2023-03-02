import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import { activeFilterChanged, filtersFetching } from "./filter_slice";
import Spinner from "../Spinner";
import Error from '../Error';
import classNames from 'classnames'

export default function NewsFilter() {
  const { filters, filterLoadingStatus, activeFilter } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filtersFetching());
    // eslint-disable-next-line
  }, [])

  if (filterLoadingStatus === 'loading') {
    return <Spinner />
  } else if (filterLoadingStatus === 'error') {
    return <Error />
  }
  const renderFilters = arr => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Doesn't Found!</h5>
    }
    return arr.map(({ name, className, label }) => {
      const btnClasses = classNames('btn', className, {
        'active': name === activeFilter
      });
      return (
        <button
          key={name} id={name}
          onClick={() => dispatch(activeFilterChanged(name))}
          className={`${btnClasses} text-white`}
        >
          {label}
        </button>
      )
    })
  }

  const element = renderFilters(filters);

  return (
    <div id="filter" className="border shadow-lg mt-2 rounded">
      <div className="card-body">
        <p className="card-text">Filter by Category</p>
        <div className="btn-group w-100">
          {element}
        </div>
      </div>
    </div>
  )
}
