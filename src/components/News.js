import NewsItem from "./NewsItem";
import React, { Component } from "react";
import Spinners from "./Spinners";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static defaultProps = {
    pageSize: 10,
    category: "general",
  };
  capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsNinja | Top ${this.capitalize(
      this.props.category
    )} Headlines`;
  }

  async display() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=in&page=${this.state.page}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=f9b14b137bf74517a9d099de1a5e7013`;
    this.props.setProgress(10);
    this.setState({ loading: true });
    this.props.setProgress(15);
    let data = await fetch(url);
    this.props.setProgress(20);
    let parsedData = await data.json();
    this.props.setProgress(80);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.display();
  }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.display();
  // };

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.display();
  // };

  fetchMoreData = async() => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=in&page=${this.state.page}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=f9b14b137bf74517a9d099de1a5e7013`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="container my-30 text-center" style={{marginTop: "75px"}}>
          NewsNinja | Top {this.capitalize(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinners/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinners/>}
        >
          <div className="container">
            {this.state.articles.map((element) => {
              return (
                <div className="my-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    urlToImage={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKEGmmEQ4WlpXIfdqhhaFbJER2pXMLOFU3A&usqp=CAU"
                    }
                    url={element.url}
                    author={!element.author ? "Unknown" : element.author}
                    time={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
