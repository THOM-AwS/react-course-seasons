import React from 'react';
import { createRoot } from 'react-dom/client';
import SeaasonDisplay from './season';
import Spinner from './spinner';
const container = document.getElementById('root');
const root = createRoot(container);


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lat: null, error: ''};
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude}),
            (err) => this.setState({error: err.message})
        );
    }
    render() {
        if ( this.state.error && !this.state.lat ) {
            return <div>Error: {this.state.error}</div>;
        }
        if (!this.state.lat && !this.state.error) {
            return <Spinner message="Please allow the location request...."/>;
        }
        return (
            <div>
                <SeaasonDisplay lat={ this.state.lat } />
            </div>
        );
    }
}

root.render(<App />);