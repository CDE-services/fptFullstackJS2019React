import React, { Component } from 'react'
import {
  withRouter,
  useHistory,
  useRouteMatch } from 'react-router-dom'

export class Comments extends Component {
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
  const history = useHistory()
  const match = useRouteMatch()
  return (
    <thead>
      <tr>
        <th className="align-middle">
          Player
        </th>
        <th className="align-middle" style={{width: '100%'}}>
          Comment
        </th>
        <th className="align-middle">
          Date
        </th>
        <th className="align-middle">
          <button className="btn btn-primary text-nowrap"
                  onClick={() => routeToComments(history, match)}>
            Add a comment
          </button>
        </th>
      </tr>
    </thead>
  )
}

function routeToComments(history, match) {
  history.push(`${match.url}/comment-form`)
}

function CommentsTableBody({ commentsData }) {
  const rows = commentsData.map((comment, index) => 
    <tr key={index}>
      <td>{comment.player}</td>
      <td>{comment.comment}</td>
      <td colspan="2">{comment.date}</td>
    </tr>
  );
  return (
    <tbody>
      {rows}
    </tbody>
  )
}

export class CommentForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      player: '',
      comment: '',
      formErrors: {player: '', comment: ''},
      playerValid: false,
      commentValid: false,
      formValid: false
    }
  }

  render () {
    return (
      <form>
        <h2 className="mb-4 mt-4">
          Add a comment to this perfect game!
          </h2>
        <div className={`form-group ${this.errorClass(this.state.formErrors.player)} ${this.validClass(this.state.playerValid)}`}>
          <label htmlFor="player">Player name</label>
          <input className="form-control"
                 type="player"
                 name="player"
                 onChange={(event) => this.handleChange(event)} />
          <span className="glyphicon glyphicon-warning-sign form-control-feedback">
            {this.state.formErrors.player}
          </span>
        </div>
        <div className={`form-group mb-4 ${this.errorClass(this.state.formErrors.comment)} ${this.validClass(this.state.commentValid)}`}>
          <label htmlFor="comment">Comment</label>
          <input className="form-control"
                 type="comment"
                 name="comment"
                 onChange={(event) => this.handleChange(event)} />
          <span className="glyphicon glyphicon-warning-sign form-control-feedback">
            {this.state.formErrors.comment}
          </span>
        </div>
        <button className="btn btn-primary mr-2"
                type="submit"
                onClick={() => this.handleSubmit()}
                disabled={!this.state.formValid}>
           Submit
        </button>
        <button className="btn btn-secondary"
                type="button"
                onClick={() => this.handleCancel()}>
           Cancel
        </button>
      </form>
    )
  }

  handleChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    }, () => { this.validateField(name, value) })
  }

  validateField(fieldName, value) {
    let { formErrors, playerValid, commentValid } = this.state;
  
    switch(fieldName) {
      case 'player':
        formErrors.player = value ? 
                    (value.length >= 3 ? '' : 'player name is too short') 
                    : 'you have to enter player name';
        playerValid = formErrors.player.length <= 0
        break;
      case 'comment':
        formErrors.comment = value ? 
                    (value.length >= 3 ? '' : 'comment is too short') 
                    : 'you have to enter a comment';
        commentValid = formErrors.comment.length <= 0
        break;
      default:
        break;
    }
    this.setState({
      formErrors: formErrors,
      playerValid: playerValid,
      commentValid: commentValid,
    }, this.validateForm());
  }
  
  validateForm() {
    this.setState({
      formValid: this.state.commentValid && this.state.playerValid
    });
  }

  errorClass(error) {
    return(error ? '' : 'has-error');
  }

  validClass(valid) {
    return(valid ? 'has-success' : '');
  }

  handleSubmit = (event) => {
    
    this.routeToMinesweeper()
  }

  handleCancel = () => {
    this.routeToMinesweeper()
  }

  routeToMinesweeper() {
    const { history, match } = this.props
    history.push(`${match.url}`)
  }
}

const FormErrors = ({formErrors}) =>
<div className='formErrors'>
  {Object.keys(formErrors).map((fieldName, i) => {
    if(formErrors[fieldName].length > 0){
      return (
        <p key={i}>{fieldName} {formErrors[fieldName]}</p>
      )        
    } else {
      return '';
    }
  })}
</div>

export default withRouter(CommentForm)