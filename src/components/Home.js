import React from 'react';
import MathJax from 'react-mathjax2';
import { Container, Row, Col, Form, FormControl, Button, Alert } from 'react-bootstrap';
import './styles/Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      equation: '',
      answer: '',
      showCorrect: false,
      showIncorrect: false,
      correctCount: 0
    };

    this.textInput = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateNewEquation = this.generateNewEquation.bind(this);
    this.closeFailure = this.closeFailure.bind(this);
  }

  componentDidMount() {
    this.generateNewEquation(5);

    this.textInput.current.focus();
  }

  generateNewEquation(max) {
    let a = Math.floor(Math.random() * Math.floor(max)) + 1;
    let b = Math.floor(Math.random() * Math.floor(max)) + 1;
    let x = Math.floor(Math.random() * Math.floor(max)) + 1;

    let c = (a * x) + b;

    // Create equation string
    let str = `${a}x + ${b} = ${c}`;
    console.log(str);

    let ans = x;
    console.log(ans);

    this.setState({
      value: '',
      equation: str,
      answer: ans,
      showCorrect: false,
      showIncorrect: false
    });

    this.textInput.current.focus();
  }

  closeFailure() {
    this.setState({ showIncorrect: false });
  }

  handleSubmit(e) {
    e.preventDefault();

    try {
      let val = Number.parseInt(this.state.value);
      if (!Number.isNaN(val)) {
        console.log(val);

        if (val === this.state.answer) {
          this.setState((state) => {
            return {
              showCorrect: true,
              correctCount: state.correctCount + 1
            }
          });

          setTimeout(() => this.generateNewEquation(5), 3000);
        } else {
          this.setState({ 
            showIncorrect: true
           });

          setTimeout(() => this.closeFailure(), 3000);
        }
      } else {
        console.log('Not a number');
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Container className='first'>
        <Row className='text-right'>
          <Col>
            <h6>Correct: {this.state.correctCount}</h6>
          </Col>
        </Row>
        <Row>
          <Col className='text-center'>
            <MathJax.Context input='ascii'>
              <MathJax.Node>{this.state.equation}</MathJax.Node>
            </MathJax.Context>
          </Col>
        </Row>
        <Row className='second-row'>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId='formAnswerEntry'>
                <Form.Control ref={this.textInput} type='text' placeholder='Enter your answer here...' value={this.state.value} onChange={this.handleChange} />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className='second-row text-center'>
          <Col>
            <Alert className='text-center' show={this.state.showCorrect} variant='success'>
              Correct! Good work... on to the next.
          </Alert>
            <Alert className='text-center' show={this.state.showIncorrect} variant='danger'>
              Incorrect, give it another shot. You got this.
          </Alert>
          </Col>
        </Row>
      </Container>
    )
  }
}