import React from 'react'
import { Container, Row, Col, Label, Input, Card, CardBody, CardTitle, Button} from 'reactstrap';
import api from '../api'
import {Link} from 'react-router-dom'

class Login extends React.Component {
	state = {
		email:"",
		password:""
	}
	render() {
		return(
			<Container fluid>
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
											this.props.toggleAlert(res.data.msg, res.data.status)
											localStorage.setItem("jwt", res.data.token)
											localStorage.setItem("user", JSON.stringify(res.data.user))
											this.props.history.push("/")
										} else {
											this.props.toggleAlert(res.data.msg, res.data.status)
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