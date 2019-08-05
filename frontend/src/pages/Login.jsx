import React from 'react'
import { Container, Row, Col, Label, Input, Card, CardBody, CardTitle, Button, Alert } from 'reactstrap';
import api from '../api'
import {Link} from 'react-router-dom'

class Login extends React.Component {
	state = {
		email:"",
		password:"",
		toastShow:false,
		toastStatus:"success",
		toastMessage:"placeholder"
	}
	render() {
		return(
			<Container fluid>
				<Alert isOpen={this.state.toastShow} color={this.state.toastStatus} toggle={() => this.setState({toastShow:!this.state.toastShow})}>
					<h4 className="alert-heading">Hey, listen!</h4>
					<p>
						{this.state.toastMessage}
					</p>
				</Alert>
				<Row className="mt-5 pt-5">
					<Col md="6" className="mx-auto">
						<Card body>
							<CardTitle>Sign In</CardTitle>
							<CardBody>
								<Label for="email">Email</Label>
								<Input type="email" id="email" placeholder="enter your email" onChange={(e) => this.setState({email:e.target.value})}/>
								<Label for="password">Password</Label>
								<Input type="password" id="password" placeholder="enter your password" onChange={(e) => this.setState({password:e.target.value})}/>
								<Button onClick={() => {
									api.post("/authenticate/local", {email:this.state.email, password:this.state.password})
									.then(res => {
										if (res.data.status === "success") {
											this.setState({
												toastShow:true,
												toastMessage:res.data.msg
											}, () => {
												localStorage.setItem("jwt", res.data.token)
												localStorage.setItem("user", JSON.stringify(res.data.user))
											})
										} else {
											this.setState({
												toastShow:true,
												toastStatus:res.data.status,
												toastMessage:res.data.msg
											})
										}
									}).catch(err => {
										console.log(err)
									})
								}}>Sign In</Button> or <Link to="/register"><Button>Register</Button></Link>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Login