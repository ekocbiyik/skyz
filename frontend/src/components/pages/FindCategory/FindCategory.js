import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import Naive from '../../../img/naive.jpg';
import Elastic from '../../../img/elasticsearch.png'

const { Search } = Input;

class FindCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: ''
        }
    }
  searchCategory = (value) => {
    this.setState({
        category: value
    })
  }
  render() {
    return (
        <>
            <div className="name-wrapper">
                <span className="team-name">Skyz</span>
            </div>
                <div className="find-category">
                <Search
                    placeholder="Bir cümle girin."
                    onSearch={value => this.searchCategory(value)}
                    style={{ width: 200 }}
                />
            </div>
            
            <Row>
                <Col span={12} className="main-image-wrapper">
                    <div>
                        <div>
                            <img className="elastic-algo" src={Elastic} />
                        </div>
                        <div className="algo-result">
                            Spor %60
                        </div>
                    </div>
                </Col>
                <Col span={12} className="main-image-wrapper">
                    <div>
                        <div>
                        <img className="naive-algo" src={Naive} />
                        </div>
                        <div className="algo-result">
                            Spor %60
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}}

export default FindCategory;
