import React, { Component } from 'react'
import axios from 'axios'
import CardGroup from 'react-bootstrap/CardGroup'
import FavoriteCard from './FavoriteCard'
import UpdateForm from './UpdateForm'


export class Favorite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteData: [],
      showUpdate: false,
      choosenToUpdate: {}
    }
  }
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/favorite`).then(response => {
      this.setState({
        favoriteData: response.data
      })
    }).catch(error => alert(error.message))
  }
  removeFromFavorite = async (item) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/favorite/${item.name}`).then(response => {
      console.log(response.data)
    }).catch(error => alert(error.message))
    axios.get(`${process.env.REACT_APP_SERVER_URL}/favorite`).then(response => {
      this.setState({
        favoriteData: response.data
      })
    }).catch(error => alert(error.message))
  }
  showUpdateForm = (item) => {
    this.setState({
      showUpdate: !this.state.showUpdate,
      choosenToUpdate: item
    })
  }
  updateTheApi = async (e) => {
    e.preventDefault();
    const itemName = this.state.choosenToUpdate.name
    const reqBody = {
      name: e.target.name.value,
      img: e.target.image.value,
      level: e.target.level.value
    }
    // console.log(itemName,reqBody)
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/favorite/${itemName}`, reqBody).then(response => {
      console.log(response.data);
    }).catch(error => alert(error.message))
    axios.get(`${process.env.REACT_APP_SERVER_URL}/favorite`).then(response => {
      this.setState({
        favoriteData: response.data,
        showUpdate:false
      })
    }).catch(error => alert(error.message))
  }
  render() {
    return (
      <div>
        {
          this.state.showUpdate &&
          <UpdateForm
            item={this.state.choosenToUpdate}
            updateTheApi={this.updateTheApi}
          />
        }
        {this.state.favoriteData &&
          <CardGroup>
            {
              this.state.favoriteData.map((value, idx) => {
                return (
                  <FavoriteCard
                    key={idx}
                    name={value.name}
                    img={value.img}
                    level={value.level}
                    removeFromFavorite={this.removeFromFavorite}
                    showUpdateForm={this.showUpdateForm}
                  />
                )
              })
            }
          </CardGroup>
        }
      </div>
    )
  }
}

export default Favorite
