import React from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { TotalRevenue } from '../../components/dashboard';
import Cards from '../ui-components/cards';

const Admin = () => {
    return (
        <div>
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            <Cards/>
            <Row>
                <Col sm={12} lg={12}>
                    <TotalRevenue />
                </Col>
            </Row>
        </div >
    );
}

export default Admin;
