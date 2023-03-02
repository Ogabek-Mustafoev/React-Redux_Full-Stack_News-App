import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import useHttp from '../../hooks/useHttp';
import NewsListItem from "../NewsListItem";
import Error from "../Error";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { newsDeleted, fetchNews, filteredNewsSelected } from "./news_slice";
import '../styles.css';

export default function NewsList() {
  const filteredNews = useSelector(filteredNewsSelected);
  const filterLoadingStatus = useSelector(state => state.filter.filterLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchNews());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/news/${id}`, 'DELETE')
      .then(dispatch(newsDeleted(id)))
      .catch(error => console.log(error));
    // eslint-disable-next-line
  }, []);

  if (filterLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filterLoadingStatus === 'error') {
    return <Error />;
  }

  const renderNewsList = (arr = []) => {
    if (!arr.length) {
      return (
        <CSSTransition timeout={500} classNames="item" >
          <h3 className="text-center mt-5">News doesn't exist!</h3>
        </CSSTransition>
      )
    } else {
      return arr.map(({ id, ...props }) => (
        <CSSTransition key={id} timeout={500} classNames="item" >
          <NewsListItem onDelete={() => onDelete(id)} {...props} />
        </CSSTransition>
      )).reverse();
    }
  }

  const element = renderNewsList(filteredNews);

  return (
    <TransitionGroup className='news-list' component={'ul'} >
      {element}
    </TransitionGroup>
  )
}
