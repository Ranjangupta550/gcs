import React from 'react';
import profilepng from '../assets/Svg/profile.png'; // Placeholder image

import { motion } from 'framer-motion';
import {
    MDBCol,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
} from 'mdb-react-ui-kit';

function PilotProfileCard({ pilotData }) {
    if (!pilotData) return null;

    return (
        <motion.div
            className='w-[500px] h-[200px] absolute top-20 right-20 z-50 bg-white flex rounded-lg shadow-lg items-center justify-evenly'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5,}}
        >
            <div className='w-36 h-4/5 border-r-yellow-100 flex items-center justify-center'>
                <MDBCardImage
                    src={pilotData.image || profilepng}
                    alt='Pilot Image'
                    position='top'
                    style={{ height: '80%', objectFit: 'cover', borderRadius: '8px' }}
                />
            </div>
            <div className='w-2/3 h-4/5'>
                <MDBCol className='h-full'>
                    <MDBCard className='h-4/5'>
                        <MDBCardBody>
                            <MDBCardTitle style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                                {pilotData.name}
                            </MDBCardTitle>
                            <MDBCardText style={{ fontSize: '1rem', color: '#555', marginBottom: '0.1rem' }}>
                                <strong>Role:</strong> {pilotData.role}
                            </MDBCardText>
                            <MDBCardText style={{ fontSize: '1rem', color: '#555', marginBottom: '0.1rem' }}>
                                <strong>Total Drones:</strong> {pilotData.totalDrones}
                            </MDBCardText>
                            <MDBCardText style={{ fontSize: '1rem', color: '#555', marginBottom: '0.1rem' }}>
                                <strong>Current Mission:</strong> {pilotData.currentMission}
                            </MDBCardText>
                            <MDBCardText style={{ fontSize: '1rem', color: '#555', marginBottom: '0.1rem' }}>
                                <strong>Experience:</strong> {pilotData.experience} years
                            </MDBCardText>
                            <MDBCardText style={{ fontSize: '1rem', color: '#555' }}>
                                <strong>Drone ID:</strong> {pilotData.droneId}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        </motion.div>
    );
}

export default PilotProfileCard;
