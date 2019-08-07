import React from 'react'
import Alert from './Alert';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from '../Routes';
import Header from './Navbar'

class Layout extends React.Component {
    state = {
        isOpen:false,
        message:"",
        color:"success"
    }
    toggleAlert = (message, color) => {
        this.setState({isOpen:true, color, message})
    }
    render() {
        return(
            <div>
                <Router>
                    <Alert isOpen={this.state.isOpen} message={this.state.message} color={this.state.color} toggle={() => this.setState({isOpen:!this.state.isOpen})}/>
                    <Header />
                    <Routes toggleAlert={this.toggleAlert}/>
                </Router>
            </div>
        )
    }
}

export default Layout