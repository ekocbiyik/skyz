import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import Naive from '../../../img/naive.jpg';
import Elastic from '../../../img/elasticsearch.png'
import axios from "axios"
import fakeData from './fakeData';

const { Search } = Input;

class FindCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            ElasticData: '',
            BayesData: ""
        }
    }

  searchCategory = (value) => {
    axios.post(`http://127.0.0.1:8000/api/elasticsearch?context=` + value, {headers: {"Access-Control-Allow-Origin": "*", "Content-Type":"application/json","Access-Control-Allow-Headers": "Origin, X-Requested-With", "Content-Type": "Accept"}})
    .then(res => {
        this.setState({
            category: value,
            ElasticData: res.data
        })
    })

    axios.post(`http://127.0.0.1:8000/api/bayessearch?context=` + value, {headers: {"Access-Control-Allow-Origin": "*", "Content-Type":"application/json","Access-Control-Allow-Headers": "Origin, X-Requested-With", "Content-Type": "Accept"}})
    .then(res => {
        this.setState({
            category: value,
            BayesData: res.data
        })
    })
    
  }
  render() {
      const { ElasticData, BayesData } = this.state;
    return (
        <>
            <div className="name-wrapper">
                <span className="team-name">Skyz</span>
            </div>
                <div className="find-category">
                    <Search
                        placeholder="Bir cümle girin."
                        onSearch={value => this.searchCategory(value)}
                    />
                </div>
                {
                    ElasticData &&
                    <Row>
                        <Col span={12} className="main-image-wrapper">
                            <div>
                                <div>
                                    <img className="elastic-algo" src={Elastic} />
                                </div>
                                <div className="elastic-result">
                                    {
                                        ElasticData &&
                                        ElasticData[0]['_source']['category']
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col span={12} className="main-image-wrapper">
                            <div>
                                <div>
                                <img className="naive-algo" src={Naive} />
                                </div>
                                <div className="native-result">
                                    {
                                        BayesData &&
                                        BayesData
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
        </>
    )
}}

export default FindCategory;