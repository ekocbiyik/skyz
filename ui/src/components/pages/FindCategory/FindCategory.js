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
            data: ''
        }
    }

  searchCategory = (value) => {
    //     axios.post(`http://127.0.0.1:8000/api/elasticsearch?context=yeni çıkan telefonlar 4 kamerası ile self çekmek mükü`, {headers: {"Access-Control-Allow-Origin": "*", "Content-Type":"application/json","Access-Control-Allow-Headers": "Origin, X-Requested-With", "Content-Type": "Accept"}})
    //   .then(res => {
    //     console.log("iresponse", res)
    //   })

    this.setState({
        category: value,
        data: fakeData
    })
  }
  render() {
      const { data } = this.state;
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
                    data &&
                    <Row>
                        <Col span={12} className="main-image-wrapper">
                            <div>
                                <div>
                                    <img className="elastic-algo" src={Elastic} />
                                </div>
                                <div className="elastic-result">
                                    {
                                        data &&
                                        data[0]['_source']['category']
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
                                        data &&
                                        data[0]['_source']['category']
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