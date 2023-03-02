import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { newsCreated } from "./NewsList/news_slice";
import useHttp from './../hooks/useHttp';
import { v4 } from 'uuid'

export default function NewsAddForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { filters, filterLoadingStatus } = useSelector(state => state.filter)
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = e => {
    e.preventDefault();
    const newNews = { id: v4(), name, description, category };
    request('http://localhost:3001/news', 'POST', JSON.stringify(newNews))
      .then(dispatch(newsCreated(newNews)))
      .catch(err => console.log(err));
    setName('');
    setCategory('');
    setDescription('');
  }

  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Loading Options</option>
    } else if (status === 'error') {
      return <option >Error Options</option>
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === 'All') {
          return null;
        } else {
          return <option key={name} value={name} >{label}</option>
        }
      })
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="border p-4 mt-2 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">News</label>
        <input
          type='text' id="name"
          required name="name"
          className="form-control"
          placeholder="News name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Description</label>
        <textarea
          style={{ height: '6rem' }}
          type='text' required name="text"
          className="form-control" id="text"
          placeholder="News description..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Categories</label>
        <select
          required className="form-select"
          id="category" name="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option disabled>News category?</option>
          {renderFilters(filters, filterLoadingStatus)}
        </select>
      </div>
      <button type="submit" className="btn btn-outline-light w-100">Create News</button>
    </form>
  )
}
