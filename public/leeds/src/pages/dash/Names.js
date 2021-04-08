import React from 'react'
import { Col, Container, Alert } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { leedsFirestore } from '../../fire/main';
import { cleanNames } from '../utils/namesUtil';

import '../../css/dash.css';


function LoadingScreen (props) {
    const namesAvailable = props.names;

    const alertStyle = {
        marginTop: '2em',
        textAlign: 'center'
    };

    let alertType, message;

    switch (namesAvailable) {
        case '0':
            alertType = 'info';
            message = 'No names available. (May also be a problem with your network)';
            break;

        case 'loading':
            alertType = 'warning';
            message = 'Loading names...';
            break;

        case 'error':
            alertType = 'danger';
            message = 'An error occured and could not load the names';
            break;
    
        default:
            break;
    }

    return (
        <Container style={alertStyle}>
			<Alert variant={alertType}>
				<Alert.Heading>{message}</Alert.Heading>
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
            case 1:
                name = " semi-okay";
                break;
            
            case 2:
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


export default function NamesSection () {
    const namesRef = leedsFirestore.collection('users');
    const q = namesRef.limit(20);
    const [_names, loading, error] = useCollectionData(q, {idField: 'phoneNumber'});
    const names = _names? _names.map((_name) => cleanNames(_name)): [];
    const rowNames = names.map((name, i) => <DashRow key={name.phone} number={`${++i}.`} {...name} />);

    return (
        <Col md={9} id="ls">
            <div className="lss">
                <DashRow number="No." name="Name" progress="Progress" status="status" title={true} />
                {!loading? rowNames.length > 0? rowNames: <LoadingScreen names={'0'} />: error? <LoadingScreen names={'error'} />: <LoadingScreen names={'loading'} />}
            </div>
        </Col>
    )
};
