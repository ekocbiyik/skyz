import React from 'react';
import { Collapse } from 'antd';
import { Spin } from 'antd';
import axios from "axios"
import { Row, Col } from 'antd'
import Naive from '../../../img/naive.jpg';
import Elastic from '../../../img/elasticsearch.png'

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
            count: 0,
            data: ''
        }
    }
  searchCategory = (value) => {
    this.setState({
        category: value
    })
  }
  componentDidMount() {
    axios.post(`http://127.0.0.1:8000/login/`, {headers: {"Access-Control-Allow-Origin": "*", "Content-Type":"application/json","Access-Control-Allow-Headers": "Origin, X-Requested-With", "Content-Type": "Accept"}})
       .then(res => {
           console.log("iresponse", res)
            this.setState({
                data: res.data
            })
            setTimeout(
                this.startTimeout,
                700
            );
    })
    
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
                700
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
      const { data } = this.state
      console.log("data",data)
    return (
        <>
            <div className="name-wrapper">
                <span className="team-name">Skyz</span>
            </div>
            <div className="email-subject">
            {
                data ?
                <Row>
                    <Col span={12} className="main-image-wrapper">
                    <div>
                            <div className="email-elastic">
                            <img className="naive-algo" src={Naive} />
                            </div>
                            <Collapse accordion>
                        {
                            data &&
                            data.map((item,i) => {
                                return <Panel header={<div>{item.header} {this.state[`isLoaded${i}`] === undefined ? <Spin className="category-spin" size="small" /> : <span className="category-result"> Kategorisi: {item["bayes_subject"]}</span>}</div>} key={i}>
                                <p>{item.body}</p>
                            </Panel>
                            })
                        }
                        </Collapse>
                    </div>
                        
                    </Col>
                    <Col span={12} className="main-image-wrapper">
                    <div>
                            <div className="email-elastic">
                            <img className="elastic-algo" src={Elastic} />
                            </div>
                    
                        <Collapse accordion>
                            {
                                data &&
                                data.map((item,i) => {
                                    return <Panel header={<div>{item.header} {this.state[`isLoaded${i}`] === undefined ? <Spin className="category-spin" size="small" /> : <span className="category-result"> Kategorisi: {item.elastic_subject[0]['_source']['category']}</span>}</div>} key={i}>
                                    <p>{item.body}</p>
                                </Panel>
                                })
                            }
                        </Collapse>
                        </div>
                    </Col>
                </Row>
                :
                <div className="spinn">
                    <Spin size="large" />
                </div>
            }
            </div>
        </>
    )
}}

export default MailSubject;
