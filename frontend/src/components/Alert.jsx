import React from 'react'
import {Alert} from 'reactstrap'




const AlertContainer = ({isOpen, color, message, toggle}) => (
    <Alert isOpen={isOpen} color={color} toggle={() => toggle()}>
        <h4 className="alert-heading">Hey, listen!</h4>
        {message}
    </Alert>
)

export default AlertContainer