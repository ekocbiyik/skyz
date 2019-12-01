import React from 'react';
import { Collapse } from 'antd';
import { Spin } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class MailSubject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            count: 1
        }
    }
  searchCategory = (value) => {
    this.setState({
        category: value
    })
  }
  componentDidMount() {
    setTimeout(
        this.startTimeout,
        1000
    );
  }

  startTimeout = () => {
    const { count } = this.state
    if (count < 10) {
        this.setState({
            ['isLoaded'+count]: true,
            count: count+1
        },() => {
            setTimeout(
                this.startTimeout,
                1000
            );
        });
    }
  }

  yukle = (i) => {
    this.setState({
        ['isLoaded'+i]: true
    })
  }

  render() {
    return (
        <>
            <div className="name-wrapper">
                <span className="team-name">Skyz</span>
            </div>
            <div className="email-subject">
                <Collapse accordion>
                     <Panel header={<div>Etkinlik {this.state['isLoaded1'] === undefined ? <Spin size="small" /> : 'Yuklendiii'}</div>} key="1">
                        <p>{text}</p>
                        dgdgd
                    </Panel>
                    <Panel header={<div>Spor Bulteni {this.state['isLoaded2'] === undefined ? <Spin size="small" /> : 'Yuklendiii'}</div>} key="2">
                        <p>{text}</p>
                    </Panel>
                    <Panel header={<div>Finans {this.state['isLoaded3'] === undefined ? <Spin size="small" /> : 'Yuklendiii'}</div>} key="3">
                        <p>{text}</p>
                    </Panel>
                </Collapse>
            </div>
        </>
    )
}}

export default MailSubject;
