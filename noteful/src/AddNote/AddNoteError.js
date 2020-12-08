import { React, Component } from 'react';
import PropTypes from 'prop-types';

class AddNoteError extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
          return (
            <h2>Unable to add note at the moment.</h2>
          );
        }
        return this.props.children;
    }
}

export default AddNoteError;

AddNoteError.propTypes = {
  children: PropTypes.node,
}