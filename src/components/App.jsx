import Navbar from "./Navbar";
import NewsAddForm from "./NewsAddForm";
import NewsFilter from "./NewsFilter/NewsFilter";
import NewsList from "./NewsList/NewsList";

export default function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <Navbar />
        <div className="content">
          <div className="content__page">
            <NewsAddForm />
            <NewsFilter />
          </div>
          <NewsList />
        </div>
      </div>
    </div>
  );
}
