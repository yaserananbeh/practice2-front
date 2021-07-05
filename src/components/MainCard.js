import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class MainCard extends Component {
  render() {
    return (
      <div style={{width:'25%'}}>
        <Card>
          <Card.Img variant="top" src={this.props.img} />
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
            {this.props.level}
            </Card.Text>
            <Button variant="primary" onClick={()=>{this.props.handleAddFavorite(this.props)}}>Add to favorites</Button>

          </Card.Body>

        </Card>
      </div>
    )
  }
}

export default MainCard
