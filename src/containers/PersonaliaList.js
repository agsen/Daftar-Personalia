import React, { Component } from 'react';
import axios from 'axios'
import { Container, Row } from 'reactstrap';
//
import DropdownPersonalia from '../compenents/DropdownPersonalia'
import PersonaliaItem from '../compenents/PersonaliaItem'

class PersonaliaList extends Component {

    state = {
        allPersonalia: [],
        addedPersonalia: [],
        selectedPersonalia: {},
        EditOrDelPersonalia: {},
        selectedEditPersonalia: {},
        indexEditPersonalia: null
    };

    handleDDChange = selectedOption => {
        const { addedPersonalia } = this.state;
        this.setState(
            {
                selectedPersonalia: selectedOption,
                addedPersonalia: [...addedPersonalia, ...[selectedOption]]
            });
    };


    handleEditItem = selectedOption => {
        this.setState(
            {
                selectedEditPersonalia: selectedOption
            });
    };

    handleSaveEdit = () => {
        const { selectedEditPersonalia, addedPersonalia, indexEditPersonalia } = this.state;
        console.log(selectedEditPersonalia)
        const newArr = addedPersonalia.map((item, i) => {
            console.log(i, indexEditPersonalia)
            if (i === indexEditPersonalia) {
                return selectedEditPersonalia
            } else {
                return item
            }
        })
        console.log(newArr)
        this.setState({ addedPersonalia: newArr });
    }


    changeIndexEdited = (id) => {
        this.setState({
            indexEditPersonalia: id
        })
    }

    handleDelete = (id) => {
        const { addedPersonalia } = this.state;
        console.log(id);
        addedPersonalia.splice(id, 1)
        this.setState({ addedPersonalia });
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=50')
            .then((res) => {
                const formatedArr = res.data.results.map((item) => {
                    const name = item.name.first + " " + item.name.last;
                    return {
                        value: name,
                        label: name,
                        thumbnail: item.picture.thumbnail
                    }
                })
                this.setState({
                    allPersonalia: formatedArr
                })
            })
    }

    renderAddedpersonalia = () => {
        const { addedPersonalia, allPersonalia } = this.state;
        if (addedPersonalia.length > 0) {
            return addedPersonalia.map((item, i) => {
                return <PersonaliaItem
                    item={item}
                    key={i}
                    id={i}
                    handleDelete={this.handleDelete}
                    options={allPersonalia}
                    handleEdit={this.handleEditItem}
                    changeIndexEdited={this.changeIndexEdited}
                    handleSaveEdit={this.handleSaveEdit}
                />
            })
        }
    }

    render() {
        const { allPersonalia } = this.state;
        console.log(this.state)
        return (
            <Container>
                <DropdownPersonalia
                    className="select-personalia"
                    options={allPersonalia}
                    handleChange={this.handleDDChange}
                />
                <h1></h1>
                <Row>
                    {this.renderAddedpersonalia()}
                </Row>


            </Container>
        )

    }
}

export default PersonaliaList