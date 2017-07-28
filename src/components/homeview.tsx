import * as React from 'react';
import { Header } from './header';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface HomeViewProps {
    handleLogin: () => void;
    loginLoading: boolean;
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
        const loginLoading = this.props.loginLoading;
        return (
            <div >
                <Header logo='assets/icon-52.png' title='Reddit Writing Prompts' message= 'Welcome' />
                {loginLoading ?
                    <main className="ms-welcome__main">
                        <Spinner size={ SpinnerSize.large } label='Loading...' ariaLive='assertive' />
                    </main>
                    :
                    <main className="ms-welcome__main">
                        <Label> Log into Reddit to start </Label> 
                        <PrimaryButton className= 'ms-welcome__action' onClick= { this.handleLogin } > Login</PrimaryButton>
                    </main>;
            </div>
        );
    }
};
