import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

class FindCategory extends React.Component {
  searchCategory = (value) => {
    console.log('category', value)
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
            
        </>
    )
  }}


export default FindCategory;
