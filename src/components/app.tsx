import * as React from 'react';
import { Button, ButtonType } from 'office-ui-fabric-react';
import { Header } from './header';
import { HeroList, HeroListItem } from './hero-list';
import { LoginControl } from './logincontrol';
import axios from 'axios';

export interface AppProps {
    title: string;
}

export interface AppState {
    prompts: HeroListItem[];
    selectedPrompt: string;
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            prompts: [],
            selectedPrompt: ''
        };
    }

    componentDidMount() {
        this.setState({
            prompts: [
                {
                    author: 'Ribbon',
                    title: 'Achieve more with Office integration'
                },
                {
                    author: 'Unlock',
                    title: 'Unlock features and functionality'
                }
            ],
            selectedPrompt: 'initial text'
        });
    }

    login() {
        console.log('login');
        axios.get('/api/auth', {
            headers: {
                'user': 'wordup2017',
                'pass': 'hackaton'
            }
        })
        .then( () => this.getNewPosts())
    }

    getNewPosts() {
        axios.get('/api/getNewPosts')
            .then((response) => {
                this.update(response);
                this.addPromptToDoc();
            })
    }

    update(response) {
        let promptItems = this.populatePrompts(response.data.data.children);
        this.setState({
            //selectedPrompt: response.data.data.children[0].data.title,
            prompts: promptItems,
        });
    }

    populatePrompts(children) {
        let promptItems = []; 
        for (let child of children)
        {
            promptItems.push(child.data);
        }
        return promptItems;
    }

    render() {
        return (
            <div className='ms-welcome'>
                <Header logo='assets/icon-52.png' title={this.props.title} message='Welcome' />                
                <HeroList message={this.state.selectedPrompt} items={this.state.prompts}>
                    <p className='ms-font-l'>Log into Reddit to start.</p>
                    <Button className='ms-welcome__action' buttonType={ButtonType.hero} icon='ChevronRight' onClick={this.login.bind(this)}>Login</Button>
                </HeroList>
                <LoginControl onClick = {this.login.bind(this) } loginMessage='Log into Reddit to start.'/>
            </div>     
        );
    }
};
