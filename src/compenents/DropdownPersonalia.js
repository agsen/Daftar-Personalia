import React, { Component } from 'react';
import Select from 'react-select';

class DropdownPersonalia extends Component {

    render() {
        const { options, handleChange, placeholder } = this.props;

        return (
            <div>
                <Select
                    placeholder={placeholder ? placeholder : "Pilih personalia ..."}
                    options={options}
                    isSearchable={true}
                    onChange={handleChange} />
            </div>
        )
    }
}

export default DropdownPersonalia