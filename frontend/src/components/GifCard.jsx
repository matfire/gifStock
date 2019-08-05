import React from 'react'
import {Card, CardTitle, CardBody, CardImg} from 'reactstrap'

const GifCard = ({url, id, name}) => (
	<Card>
		<CardImg bottom width="100%" src={url} />
		<CardBody>
			<CardTitle>{name}</CardTitle>
		</CardBody>
	</Card>
)


export default GifCard