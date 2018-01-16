import {Component} from 'react';
import {setIdToken, setAccessToken} from './AuthService';

class Callback extends Component {

    componentDidMount() {
        setAccessToken();
        setIdToken();
        window.location.href = "/dash";
    }

    render() {
        return null;
    }
}

export default Callback;