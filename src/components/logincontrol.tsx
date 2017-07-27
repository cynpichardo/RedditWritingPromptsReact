import * as React from 'react';
import { Button, ButtonType } from 'office-ui-fabric-react';

export interface LoginControlProps {
    loginMessage: string;
}


export class LoginControl extends React.Component <LoginControlProps, any > {
    constructor(props, context) {
        super(props, context);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
        this.props.onClick();
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const message = isLoggedIn ? null : this.props.loginMessage;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <LoginControlMessage isLoggedIn={isLoggedIn} message={message}/>
                {button}
            </div>
        );
    }
}

function LoginControlMessage(props) {
    const isLoggedIn = props.isLoggedIn;
    if (!isLoggedIn) {
        return <p className='ms-font-l'>{props.message}</p>;
    }
    return null;
}

function LoginButton(props) {
    return (
        <Button className='ms-welcome__action' buttonType={ButtonType.hero} icon='ChevronRight' onClick={ props.onClick }>Login</Button>
    );
}

function LogoutButton(props) {
    return (
        <Button className='ms-welcome__action' buttonType={ButtonType.hero} icon='ChevronRight' onClick={ props.onClick }>Logout</Button>
    );
}