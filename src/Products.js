import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import p1 from './images/product1.png'
import rating from './images/rating.png'

const Products = () => {
    return (
        <div style={{ marginLeft: "100px", marginRight: "100px", marginTop: "20px" }}>
            <div style={{ backgroundColor: "white", paddingTop: "10px", paddingLeft: "10px" }}>
                <h5>Suggested Items</h5>
                <a style={{ color: "grey" }}>Inspired by Your Interest</a>
                <br></br>
            </div>
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src={p1} />
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title>Nothing Phone (1)</Card.Title>
                        <img src={rating}></img>
                        <Card.Text>
                            {' '}
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card>
                    <Card.Img variant="top" src={p1} />
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title>Nothing Phone (1)</Card.Title>
                        <img src={rating}></img>
                        <Card.Text>
                            {' '}
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card>
                    <Card.Img variant="top" src={p1} />
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title>Nothing Phone (1)</Card.Title>
                        <img src={rating}></img>
                        <Card.Text>
                            {' '}
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card>
                    <Card.Img variant="top" src={p1} />
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title>Nothing Phone (1)</Card.Title>
                        <img src={rating}></img>
                        <Card.Text>
                            {' '}
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card>
                    <Card.Img variant="top" src={p1} />
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title>Nothing Phone (1)</Card.Title>
                        <img src={rating}></img>
                        <Card.Text>
                            {' '}
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card>
                    <Card.Img variant="top" src={p1} />
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title>Nothing Phone (1)</Card.Title>
                        <img src={rating}></img>
                        <Card.Text>
                            {' '}
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card>
                    <Card.Img variant="top" src={p1} />
                    <Card.Body style={{ textAlign: "center" }}>
                        <Card.Title>Nothing Phone (1)</Card.Title>
                        <img src={rating}></img>
                        <Card.Text>
                            {' '}
                        </Card.Text>
                    </Card.Body>

                </Card>

            </CardGroup>
        </div>
    )
}

export default Products