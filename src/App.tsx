import * as React from 'react';
import './App.css';

interface InputProps {
  inputValue: string;
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

class Input extends React.Component <InputProps, {}> {
  render() {
    return (
      <textarea onChange={this.props.onChange} value={this.props.inputValue}/>
    );
  }
}

interface OutputProps {
  counter: Object;
  lines: Array<string>;
}

class Highlighter extends React.Component <OutputProps, {}> {
  isHighlighted(line: string): string {
    if (this.props.counter[line] > 1) {
      return 'highlighted';
    } else {
      return '';
    }
  }
  render() {
    return (
      <ul>
        {
          this.props.lines.map( (line, lineNo) => {
            return <li className={`lines ${this.isHighlighted(line)}`} key={lineNo}>{line}</li>;
          })
        }
      </ul>
    );
  }
}

class Summary extends React.Component <OutputProps, {}> {
  renderHighlightedLines() {
    let highlightedLines = Object.keys(this.props.counter).
      filter((line) => { return this.props.counter[line] > 1; } );

    return highlightedLines.map( (line, index) => {
      return (
        <tr key={index}>
          <td>{line}</td>
          <td>{this.props.counter[line]}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Line Content</th>
            <th>Occurrences</th>
          </tr>
        </thead>
        <tbody>
        {this.renderHighlightedLines()}
        </tbody>
      </table>
    );
  }
}

interface WorkspaceState {
  inputValue: string;
  counter: {};
  lines: Array<string>;
}
class Workspace extends React.Component <{}, WorkspaceState> {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      counter: {},
      lines: []
    };

    this.textChanged = this.textChanged.bind(this);
  }
  textChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const lines = e.target.value.split('\n');

    let counter = {};
    lines.forEach( (line) => {
      counter[line] = counter[line] ? counter[line] + 1 : 1;
    });

    this.setState({...this.state,
      inputValue: e.target.value,
      lines: lines,
      counter: counter
    });
  }
  render() {
    return (
      <div className="container">
        <Input onChange={this.textChanged} inputValue={this.state.inputValue}/>
        <Highlighter counter={this.state.counter} lines={this.state.lines}/>
        <Summary counter={this.state.counter} lines={this.state.lines}/>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Workspace />
    );
  }
}

export default App;
