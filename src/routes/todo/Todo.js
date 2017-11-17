import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Todo.css';

class Todo extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      id: Date.now(),
      text: this.state.text,
    };
    this.setState(preState => ({
      items: preState.items.concat(newItem),
      text: '',
    }));
    // alert('A name was submitted:' + this.state.value);
    // event.preventDefault();
  }

  handleRemove(item) {
    this.setState({
      items: this.state.items.filter(el => el.id !== item.id),
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <TodoList items={this.state.items} handleRemove={this.handleRemove} />
          <form onSubmit={this.handleSubmit}>
            <label>
              Create:
              <input
                type="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

class TodoList extends React.Component {
  removeItem(item, e) {
    console.log(e.target);
    console.log(`Remove ${item.text}`);
    this.props.handleRemove(item);
    console.log(this.props);
  }

  render() {
    // console.log(this.removeItem(item));
    return (
      <ul>
        {this.props.items.map(item => (
          <li onClick={e => this.removeItem(item, e)} key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    );
  }
}

export default withStyles(s)(Todo);
