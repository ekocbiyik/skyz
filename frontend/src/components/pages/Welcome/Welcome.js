import React from 'react';
import Logo from '../../../img/logo.png'
import Ebru from '../../../img/ebru.jpeg'
import Asude from '../../../img/asude.jpeg'
import Cagri from '../../../img/cagri.jpeg'
import Enbiya from '../../../img/enbiya.jpeg'
import Talha from '../../../img/talha.jpeg'
import { Row, Col } from 'antd';
import { Button } from 'antd';
import {
    Link,
  } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <Row>
            {/* <Col span={24} className="logo">
                <img src={Logo} />
            </Col> */}
            <div className="name-wrapper">
                <span className="team-name">Skyz</span>
            </div>
            <Row>
                <Col span={24} className="main-image-wrapper">
                    <div className="image-wrapper">
                        <div className="image">
                            <img className="avatar-img" src={Enbiya} />
                        </div>
                        <div className="name">
                            Enbiya Koçbıyık
                        </div>
                        <div className="nickname">
                            - Ekibin Demirbaşı
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <div className="image">
                        <img className="avatar-img" src={Asude} />
                        </div>
                        <div className="name">
                            Asude Sena Ölmez
                        </div>
                        <div className="nickname">
                            - Başkan
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <div className="image">
                            <img className="avatar-img" src={Cagri} />
                        </div>
                        <div className="name">
                            Çagrı Bıyık
                        </div>
                        <div className="nickname">
                            - Nickname not found
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="main-image-wrapper">
                    <div className="image-wrapper">
                        <div className="image">
                            <img className="avatar-img" src={Talha} />
                        </div>
                        <div className="name">
                            Talha Altun
                        </div>
                        <div className="nickname">
                            - İlk Elenecek Olan
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <div className="image">
                            <img className="avatar-img" src={Ebru} />
                        </div>
                        <div className="name">
                            Ebru Güleç
                        </div>
                        <div className="nickname">
                            - Evinizin Frontendi
                        </div>
                    </div>
                </Col>
            </Row>
        </Row>
        <Row>
            <Col className="start">
                <Link to="/find-category">
                    <Button type="danger">Hadi Başlayalım</Button>
                </Link>
            </Col>
        </Row>
      </div>
    )
  }}


export default Welcome;
