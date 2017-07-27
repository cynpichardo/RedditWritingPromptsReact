import * as React from 'react';
import { Header } from './header';
import { HeroList } from './hero-list';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface HomeViewProps {
    handleLogin: void;
}

export interface HomeViewState {
}

export class HomeView extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props, context) {
        super(props, context);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
        };
    }

    handleLogin() {
        this.props.handleLogin();
    }

    componentDidMount() {
        this.setState({
        });
    }

    render() {
        return (
            <div >
                <Header logo='assets/icon-52.png' title='Reddit Writing Prompts' message= 'Welcome' />
                <main className="ms-welcome__main">
                    <Label> Log into Reddit to start </Label>
                    <PrimaryButton className='ms-welcome__action' onClick={ this.handleLogin }>Login</PrimaryButton>
                </main>              
            </div>
        );
    }
};
