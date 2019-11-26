import React, { Component } from 'react'

export default class Comments extends Component {
  state = {
    commentsData: []
  }

  componentDidMount() {
    fetch('http://localhost:3300/api/comments')
      .then(res => res.json())
      .then((data) => {
        this.setState( {
          commentsData: data
        })
        console.log(data)
      })
      .catch(console.log)
  }

  render() {
    return (
      <table className="table">
        <CommentsTableHeader />
        <CommentsTableBody commentsData={this.state.commentsData}/>
      </table>
    )
  }
}

function CommentsTableHeader() {
  return (
    <thead>
      <tr>
        <th>
          Player
        </th>
        <th>
          Comment
        </th>
        <th>
          Date
        </th>
      </tr>
    </thead>

  )
}

function CommentsTableBody({ commentsData }) {
  const rows = commentsData.map((comment, index) => 
    <tr key={index}>
      <td>{comment.player}</td>
      <td>{comment.comment}</td>
      <td>{comment.date}</td>
    </tr>
  );
  return (
    <tbody>
      {rows}
    </tbody>
  )
}