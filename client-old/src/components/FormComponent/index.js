import React from 'react';
import {Container, Button, ProgressBar, Form, Row, Col, Accordion, Card} from 'react-bootstrap';
import "../../styles/styles.scss";
import axios from "axios";

export default class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseToPost: "",
            memes: [],
            selectedMeme: "",
            name: "",
            url: "",
            selectedMethod: "",
            uploadMemeName: "",
            uploadMemeURL: "",
            selectedMemeToRemove: ""
        };

        this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
        this.handleRemoveEntry = this.handleRemoveEntry.bind(this);
        this.handleRestoreDefaults = this.handleRestoreDefaults.bind(this);
    }

    componentDidMount() {
        let initialMemes = [];
        let initialMethod = "";
        let initialMeme = "";
        fetch('api/memes')
            .then(res => res.json())
            .then((data) => {
                initialMemes = data["Memes"]["Videos"].map((meme) => {
                    return meme.name
                });
                initialMethod = data["Memes"]["Method"];
                initialMeme = data["Memes"]["ChosenMeme"][0].name;
                this.setState({memes: initialMemes, selectedMethod: initialMethod, selectedMeme: initialMeme})
            })
            .catch(console.log)
    }

    handleSettingsSubmit = async () => {
        const {selectedMeme, selectedMethod,} = this.state;
        await axios.post("api/memes/settings", {name: selectedMeme, method: selectedMethod});
        document.location.reload(true);
    };

    handleUploadSubmit = async () => {
        const {uploadMemeName, uploadMemeURL} = this.state;
        await axios.post("api/memes", {name: uploadMemeName, url: uploadMemeURL});
        document.location.reload(true);
    };

    handleRemoveEntry = async () => {
        const {selectedMemeToRemove, memes} = this.state;
        let selectedIndex = memes.indexOf(selectedMemeToRemove);
        await axios.post("memes/remove", {name: selectedMemeToRemove, index: selectedIndex});
        document.location.reload(true);
    };

    handleRestoreDefaults = async () => {
        await axios.post("api/memes/restore");
        document.location.reload(true);
    };

    render() {
        const {memes, selectedMethod, selectedMemeToRemove, uploadMemeName, uploadMemeURL, selectedMeme} = this.state;

        return (
            <Container>
                <h1>QR Code Meme Manager</h1>
                <br/>
                <ProgressBar variant={"success"} min={0} max={5} now={5}/>
                <br/>

                <Accordion>

                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"><h6>Meme Settings</h6></Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label column sm={2}> Method Selector: </Form.Label>
                                        <Col sm={10}>
                                            <select value={selectedMethod}
                                                    onChange={e => this.setState({selectedMethod: e.target.value})}
                                                    className={"custom-select"}>
                                                <option selected disabled> Select a method for displaying memes.
                                                </option>
                                                <option value={"selected"}> Selected Meme</option>
                                                <option value={"random"}> Random Meme</option>
                                            </select>
                                        </Col>
                                    </Form.Group>
                                    <br/>
                                    {(selectedMethod === "selected") && (
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Form.Label column sm={2}> Meme Selector: </Form.Label>
                                            <Col sm={10}>
                                                <select value={selectedMeme}
                                                        onChange={e => this.setState({selectedMeme: e.target.value})}
                                                        className={"custom-select"}>
                                                    <option selected disabled> Select a meme to display.</option>
                                                    {memes.map((meme) => {
                                                        return <option key={meme}> {meme} </option>
                                                    })}
                                                </select>
                                            </Col>
                                        </Form.Group>)}

                                </Form>
                                <br/>
                                <Button onClick={this.handleSettingsSubmit} variant={"success"} block> Submit </Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1"><h6>Meme Upload</h6></Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label column sm={2}> Meme Name: </Form.Label>
                                        <Col sm={10}>
                                            <input type={"text"} className={"form-control"}
                                                   onChange={e => this.setState({uploadMemeName: e.target.value})}
                                                   placeholder={"Enter a name for the meme."}/>
                                        </Col>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label column sm={2}> Meme URL: </Form.Label>
                                        <Col sm={10}>
                                            <input type={"text"} className={"form-control"}
                                                   onChange={e => this.setState({uploadMemeURL: e.target.value})}
                                                   placeholder={"Enter the URL for the meme."}/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <br/>
                                {(uploadMemeName && uploadMemeURL) && (
                                    <Button onClick={this.handleUploadSubmit} variant={"success"}
                                            block> Upload </Button>)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2"><h6>Meme Remover</h6></Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label column sm={2}> Meme Selector: </Form.Label>
                                        <Col sm={10}>
                                            <select defaultValue={1} value={selectedMemeToRemove}
                                                    onChange={e => this.setState({selectedMemeToRemove: e.target.value})}
                                                    className={"custom-select"}>
                                                <option value={1}> Select a meme to remove.</option>
                                                {memes.map((meme) => {
                                                    return <option key={meme}> {meme} </option>
                                                })}
                                            </select>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <br/>
                                {(selectedMemeToRemove) && (
                                    <Button onClick={this.handleRemoveEntry} variant={"success"} block> Remove
                                        Entry </Button>)}
                                <br/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3"><h6>About</h6></Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <h4 className={"text-center"}> Tom Heaton | 2020 </h4>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                </Accordion>
                <br/>
                <Button onClick={this.handleRestoreDefaults} variant={"success"} block> Restore To Defaults </Button>

            </Container>
        );
    }
}