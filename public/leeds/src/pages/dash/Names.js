import React, { useState, useEffect } from 'react'


import { Col, Container, Alert } from 'react-bootstrap';

import leedsStore from '../../store/leedsStore';
import { fetchNames } from '../../actions/actions'

import '../../css/dash.css';


function LoadingScreen () {
    const alertStyle = {
        marginTop: '2em',
        textAlign: 'center'
    };

    return (
        <Container style={alertStyle}>
			<Alert variant="warning">
				<Alert.Heading>Loading names...</Alert.Heading>
			</Alert>
		</Container>
    );
};


function DashRow (props) {
    const {number, name, progress, status, statusNum} = props;

    const titleClass = props.title? " title-row": "";
    const titleClassMul = props.title? " titles": "";

    const statusBG = (() => {
        let name = "";

        switch (statusNum) {
            case 2:
                name = " semi-okay";
                break;
            
            case 3:
                name = " not-okay";
                break;
        
            default:
                break;
        }
        return name;
    })();

    return (
        <div className={"dash-row" + titleClass + statusBG}>
            <div className="cells cell-1">
                <span className="cell-number">{number}</span>
                <span className={"cell-name" + titleClassMul}>{name}</span>
            </div>

            <div className={"cells cell-2" + titleClassMul}>
                <span className="cell-progress">{progress}</span>
            </div>

            <div className={"cells cell-3" + titleClassMul}>
                <span className="cell-status">{status}</span>
            </div>
        </div>
    )
};


export default function NamesSection (props) {
    const [isLoaded, setLoading] = useState(false);

    if (!isLoaded) {
        fetchNames();
    };

    const [ogNames, setNames] = useState([]);

    const names = ogNames.map((name, i) => <DashRow key={i} number={`${++i}.`} {...name} />)

    const loadTheNames = () => {
        setLoading(true);
        setNames(leedsStore.getNames());
    };

    useEffect(() => {
        leedsStore.on(leedsStore.actions.NEW_NAMES, loadTheNames);

        return () => leedsStore.removeListener(leedsStore.actions.NEW_NAMES, loadTheNames);
    });

    return (
        <Col md={9} id="ls">
            <div className="lss">
                <DashRow number="No." name="Name" progress="Progress" status="status" title={true} />
                {isLoaded? names: <LoadingScreen />}
            </div>
        </Col>
    )
};
