import * as React from 'react';
import { HomeView } from './homeview';
import { PromptsView } from './promptsview';
import { PromptsListItem } from './promptslist';
import axios from 'axios';

export interface AppProps {
    title: string;
}

export interface AppState {
    exportAvailable: boolean;
    documentBody: string;
    loginLoading: boolean;
    isLoggedIn: boolean;
    newPrompts: PromptsListItem[];
    hotPrompts: PromptsListItem[];
    risingPrompts: PromptsListItem[];

}

export class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.login = this.login.bind(this);
        this.getNewPosts = this.getNewPosts.bind(this);
        this.getHotPosts = this.getHotPosts.bind(this);
        this.getRisingPosts = this.getRisingPosts.bind(this);
        this.state = {
            newPrompts: [],
            hotPrompts: [],
            risingPrompts: [],
            documentBody: '',
            exportAvailable: false,
            isLoggedIn: false,
            loginLoading: false
        };
    }

    componentDidMount() {
        this.setState({
        });
    }

    login() {
        axios.get('/api/auth', {
            headers: {
                'user': 'wordup2017',
                'pass': 'hackaton'
            }
        })
            .then(function () {
                this.getNewPosts();
                this.getHotPosts();
                this.getRisingPosts();
                this.setState({
                    loginLoading: true
                });
            }.bind(this))
    }

    logout() {
        this.setState ({
            isLoggedIn: false,
            documentBody: '',
            exportAvailable: false
        });
    }

    getNewPosts() {
        axios.get('/api/getNewPosts')
            .then(function (response) {
                var prompts = this.populatePrompts(response.data.data.children);
                this.setState({
                    newPrompts: prompts
                });
            }.bind(this))
    }

    getHotPosts() {
        axios.get('/api/getHotPosts')
            .then(function (response) {
                var prompts = this.populatePrompts(response.data.data.children);
                this.setState({
                    hotPrompts: prompts
                });
            }.bind(this))
    }

    getRisingPosts() {
        axios.get('/api/getRisingPosts')
            .then(function (response) {
                var prompts = this.populatePrompts(response.data.data.children);
                this.setState({
                    risingPrompts: prompts,
                    selectedPrompt: response.data.data.children[0].data.title,
                    exportAvailable: true,
                    isLoggedIn: true
                });
            }.bind(this))
    }

    populatePrompts(items) {
        var promptItems = [];
        for (var item of items) {
            promptItems.push(item.data);
        }
        return promptItems;
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const view = (isLoggedIn) ? <PromptsView newPrompts={this.state.newPrompts} hotPrompts={this.state.hotPrompts} risingPrompts={this.state.risingPrompts}/>
            : <HomeView loginLoading={this.state.loginLoading} handleLogin={this.login}/>;
        return (
            <div className='ms-welcome'>
                {view}
            </div>
        );
    }
};
