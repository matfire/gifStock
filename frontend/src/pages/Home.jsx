import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import gifApi from '../gifApi'
import GifCard from '../components/GifCard';
import debounce from 'lodash.debounce'
import {PixelSpinner} from 'react-epic-spinners'

class Home extends React.Component {
	state = {
		trendingGifs: [],
		offset:0,
		loadingTrending:false
	}

	loadMoreGifs = () => {
		this.setState({loadingTrending:true})
		gifApi.get(`/trending?api_key=NZp5sKxWHZPh7mIdT83yeFT5vxfHijXN&limit=24&offset=${this.state.offset}`).then(res => {
			if (res.data.pagination.count > 0) {
				let trendingGifs = this.state.trendingGifs.concat(res.data.data)
				this.setState({trendingGifs, offset:this.state.offset + res.data.pagination.count, loadingTrending:false})
			}
		})
	}
	componentDidMount() {
		gifApi.get("/trending?api_key=NZp5sKxWHZPh7mIdT83yeFT5vxfHijXN&limit=24").then(res => {
			this.setState({trendingGifs:res.data.data, offset:this.state.offset + res.data.pagination.count})
		})
		window.onscroll = debounce(() => {
			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
				this.loadMoreGifs()
			}
		}, 100)
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
				<Row>
						{this.state.loadingTrending && <PixelSpinner size={30} color="red"/>}
				</Row>
			</Container>
		)
	}
}

export default Home