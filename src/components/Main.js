import React, { Component } from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import MainCard from './MainCard'

export class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      practiceData: []
    }
  }
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/getApi`).then(response => {
      this.setState({
        practiceData: response.data
      })
    })
  }
  handleAddFavorite=(item)=>{
    const reqBody={
      name:item.name,
      img:item.img,
      level:item.level
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/favorite`,reqBody).then(response=>{
      
      if(response.data==="already exist"){
        alert('the item already in your favorite list')
      }
      else{
        alert('added successfully')
      }
    }).catch(error=>alert(error.message))
  }
  render() {
    return (
      <div>
        {
          this.state.practiceData.length > 0 ?
            <CardGroup>
              {
                this.state.practiceData.slice(0, 10).map((value, idx) => {
                  return (
                    <MainCard 
                    key={idx}
                    name={value.name}
                    img={value.img}
                    level={value.level}
                    handleAddFavorite={this.handleAddFavorite}
                    />
                  )
                })
              }


            </CardGroup>
            :
            <Spinner animation="border" />
        }

      </div>
    )
  }
}

export default Main
