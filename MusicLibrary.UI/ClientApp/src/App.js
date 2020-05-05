import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import SignIn from './components/SignUp';
import LogIn from './components/LogIn';
import Artist from './components/Artist'
import ListOfSongs from './components/ListSongs';;

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/SignUp' component={SignIn} />
                <Route path='/LogIn' component={LogIn} />
                <Route path='/Artist' component={Artist} />
                <Route path='/Listener' component={ListOfSongs} />
            </Layout>
        );
    }
}
