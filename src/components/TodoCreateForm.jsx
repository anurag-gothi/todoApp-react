import React, { Component } from "react";
import "../styles/TodoCreateForm.css";
import { connect } from "react-redux";
import { createTodo } from "../redux/actions/todoActions";

class TodoCreateForm extends Component {
  state = {
    content: "",
    isCompleted: false,
    error:""
  };

  handlecontent = e => {
    this.setState({ content: e.target.value });
    this.setState({error:""})
  };

  handleIsCompleted = e => {
    this.setState({ isCompleted: e.target.checked });
  };

  handleSubmit = e => {
    e.preventDefault();
    // Create a todo
    const todo = {
      content: this.state.content,
      isCompleted: this.state.isCompleted,
      email:this.props.user.email
    };
    if(this.state.content.length===0){
      this.setState({error:"Empty Title"})
    }
    else{
      this.props.createTodo(todo);
    this.setState({ content: "", isCompleted: false, error:"" });
    }
    
  };

  render() {
    return (
      <form className="todo__form" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handlecontent}
          value={this.state.content}
          type="text"
          name="content"
          placeholder="Create new todo"
          required
        />
        {/* <input
          onChange={this.handleIsCompleted}
          type="checkbox"
          name="isCompleted"
          checked={this.state.isCompleted}
        /> */}
        <input type="submit" className="btn btn-create" value="Create" />
      <p>{this.state.error}</p>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTodo: todo => dispatch(createTodo(todo))
  };
};

export default connect(null, mapDispatchToProps)(TodoCreateForm);

