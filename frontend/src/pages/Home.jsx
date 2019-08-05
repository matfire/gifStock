import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import gifApi from '../gifApi'
import GifCard from '../components/GifCard';

class Home extends React.Component {
	state = {
		trendingGifs: []
	}
	componentDidMount() {
		gifApi.get("/trending?api_key=NZp5sKxWHZPh7mIdT83yeFT5vxfHijXN&limit=24").then(res => {
			this.setState({trendingGifs:res.data.data})
		})
	}
	render() {
		return(
			<Container fluid>
				<Row className="row-eq-height">
					{this.state.trendingGifs.map((gif) => (
						<Col md="4" key={gif.id}>
							<GifCard id={gif.id} url={gif.images.original.url} name={gif.title} />
						</Col>
					))}
				</Row>
			</Container>
		)
	}
}

export default Home