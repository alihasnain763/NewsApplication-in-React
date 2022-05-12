import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>

            <span className="badge rounded-pill bg-danger " >{source}</span>
          </div>
          <img src={!imageUrl ? "https://image.cnbcfm.com/api/v1/image/106806379-1607090740945-gettyimages-1229775273-CHINA-SHANGHAI-TESLA-GIGAFACTORY_CN.jpeg?v=1607090829&w=1920&h=1080" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}  ...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
