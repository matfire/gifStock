import axios from 'axios'

let api = axios.create({
	baseURL:"https://api.giphy.com/v1/gifs/"
})

export default api