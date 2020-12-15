import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "pages/Home";
import firebaseApi from "services/firebase";
import MainScreen from "pages/MainScreen";
import SignUp from "pages/Signup";
import Login from "pages/Login";

const PrivateRoute = <P extends object>({ Component, authenticated, path }: { Component: React.ComponentType<P>; authenticated: boolean; path: string }) => {
    return (
        <Route
            path={path}
            render={(props) => (authenticated ? <Component {...(props as P)} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />)}
        />
    );
};

const PublicRoute = <P extends object>({ Component, authenticated, path }: { Component: React.ComponentType<P>; authenticated: boolean; path: string }) => {
    return <Route path={path} render={(props) => (!authenticated ? <Component {...(props as P)} /> : <Redirect to="/mood" />)} />;
};

interface AppState {
    authenticated: boolean;
    loading: boolean;
}

class App extends React.Component<{}, AppState> {
    state: AppState = {
        authenticated: false,
        loading: true,
    };

    componentDidMount() {
        firebaseApi.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false,
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                });
            }
        });
    }

    render() {
        const { loading, authenticated } = this.state;
        if (loading) {
            return <h2>Loading...</h2>;
        } else {
            return (
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute path="/mood" authenticated={authenticated} Component={MainScreen} />
                    <PublicRoute path="/signup" authenticated={authenticated} Component={SignUp} />
                    <PublicRoute path="/login" authenticated={this.state.authenticated} Component={Login} />
                    <Route path="*">
                        <Redirect to={{ pathname: "/" }} />
                    </Route>
                </Switch>
            );
        }
    }
}

export default App;