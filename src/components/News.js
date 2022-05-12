import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'

  }
  
  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }

  articles = [
    {
      "source": { "id": "news24", "name": "News24" },
      "author": "Lynn Butler",
      "title": "TIMELINE | From Ngidi to Smith and Boucher: How Black Lives Matter shook CSA",
      "description": "Cricket South Africa confirmed the discrimination case against current Proteas coach Mark Boucher has been dropped. Sport24 looks at a timeline of developments at CSA over the last two years.",
      "url": "https://www.news24.com/sport/Cricket/Proteas/timeline-from-ngidi-to-smith-and-boucher-how-black-lives-matter-shook-csa-20220510",
      "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/3289/f175be4af10542c699b17089a7659e4f.jpg",
      "publishedAt": "2022-05-10T21:14:17+00:00",
      "content": "<ul><li>Cricket South Africa confirmed it had dropped all charges against Proteas head coach Mark Boucher.</li><li>Boucher was charged with the role he played in the alleged discrimination following … [+12377 chars]"
    },
    {
      "source": { "id": "bbc-sport", "name": "BBC Sport" },
      "author": "BBC Sport",
      "title": "Shane Warne memorial - watch & follow updates",
      "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
      "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
      "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
      "publishedAt": "2022-03-30T08:22:26.498888Z",
      "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
    },
    {
      "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]
  capitalizerFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() +string.slice(1);
  }
  constructor(props){
    super(props);
    console.log("Hello i am a constructer from news component")
    this.state ={
      articles:  this.articles,
      loading: true,
      page:1,
      totalResults: 0

    }
    document.title = `${this.capitalizerFirstLetter(this.props.category)} - News A-H`;

  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page} &pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(60);
    console.log(parsedData);
    this.setState({articles: parsedData.articles,
       totalResults: parsedData.totalResults,
       loading: false
      })
      this.props.setProgress(100);
  }

   async  componentDidMount(){
    // console.log("cdm")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=221ce0d0bcab4c7c8855bc94841667ee&page=1 &pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles,
    //    totalResults: parsedData.totalResults,
    //    loading: false
    //   })
    this.updateNews();
  }

    handlePrevClick = async ()=>{
      // console.log("previous click")
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=221ce0d0bcab4c7c8855bc94841667ee&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
      // this.setState({loading: true});
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // console.log(parsedData);
      // this.setState({
      //   page: this.state.page - 1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
      this.setState({page:this.state.page -1})
      this.updateNews();
    }
    
    handleNextClick = async ()=>{
      if(!( this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))){

        // console.log("Next click")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=221ce0d0bcab4c7c8855bc94841667ee&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        
        // this.setState({
        //   page: this.state.page + 1,
        //   articles: parsedData.articles,
        //   loading: false
        // })
        this.setState({page:this.state.page +1})
        this.updateNews();
      }
      
  }
  
   fetchMoreData = async () => {

    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page} &pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: this.state.articles.concat(parsedData.articles),
       totalResults: parsedData.totalResults
      })
  };


  render() {
    console.log("render")
    return (
      <>
        <h1 className="text-center my-3">A-H News - Top Headings from {this.capitalizerFirstLetter(this.props.category)} </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
      <div className="row">
        { this.state.articles.map((element)=>{     
      return <div className="col-md-4" key={element.url}>
      <NewsItem  title={element.title? element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/> 
      </div>

        })}
      </div>
      </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between ">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick} > &larr;  Previous</button>
      
      <button disabled={( this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark " onClick={this.handleNextClick}> Next &rarr; </button>
      </div> */}

      </>

    )
  }
}

export default News
