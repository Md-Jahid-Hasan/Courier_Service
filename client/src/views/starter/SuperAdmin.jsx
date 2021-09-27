import React, {useEffect, useState} from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { TotalRevenue } from '../../components/dashboard';
import Cards from '../ui-components/cards';

const SuperAdmin = () => {
    const [amount, setAmount] = useState([])
    
    
    return (
        <div>
            <Cards/>
            <Row>
                <Col sm={12} lg={12}>
                    Hello
                </Col>
            </Row>
        </div >
    );
}

export default SuperAdmin;
