
import './App.css';

import React, { Component,Fragment, } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  country = "us"
  apikey = process.env.REACT_APP_NEWS_API
  state ={
    progress:0
  }
  setProgress=(progress)=>{

    this.setState({progress: progress})
  }

  render() {
    return (
      <>
      <div>
        <Router>
          <Fragment>
          <LoadingBar
          height={4}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <NavBar/>
            <Routes>
              <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="entertainment" country={this.country} category="entertainment" />} />
              <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="business" country={this.country} category="business" />} />
              <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="general" country="us" category="general" />} />
              <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="health" country={this.country} category="health" />} />
              <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="science" country={this.country} category="science" />} />
              <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="sports" country={this.country} category="sports" />} />
              <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey}  key="technology" country={this.country} category="technology" />} />
            </Routes>
        </Fragment>
        </Router>
      </div>
      </>
    )
  }
}