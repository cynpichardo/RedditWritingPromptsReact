import * as React from 'react';
import { Header } from './header';
import { LoginControl } from './logincontrol';
import { HomeView } from './homeview';
import { PromptsView } from './promptsview';
import { ExportDoc } from './exportdoc';
import axios from 'axios';

export interface AppProps {
    title: string;
}

export interface AppState {
    exportAvailable: boolean;
    documentBody: string;
    isLoggedIn: boolean;

}

export class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.login = this.login.bind(this);
        this.state = {
            documentBody: '',
            exportAvailable: false,
            isLoggedIn: false
        };
    },

    componentDidMount() {
        this.setState({
        });
    },

    login() {
        axios.get('/api/auth', {
            headers: {
                'user': 'wordup2017',
                'pass': 'hackaton'
            }
        })
            .then(function () {
                this.setState({
                    isLoggedIn: true
                });
            }.bind(this))
    },

    logout: function() {
        this.setState = {
            isLoggedIn: false,
            documentBody: '',
            exportAvailable: false
        };
    },

    export: = async () => {
        await Word.run(async (context) => {
            var documentBody = context.document.body;
            context.load(documentBody);
            await context.sync();
            this.setState({
                documentBody: documentBody.text
            });
        });
    },

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const view = (isLoggedIn) ? <PromptsView/> : <HomeView handleLogin={this.login}/>;
        return (
            <div className='ms-welcome'>
                {view}
            </div>
        );
    }
};
