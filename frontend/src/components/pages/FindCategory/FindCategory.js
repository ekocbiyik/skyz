import React from 'react';
import { Input } from 'antd';

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
                <br/>
                {
                    this.state.category
                }
            </div>
            
        </>
    )
}}

export default FindCategory;
