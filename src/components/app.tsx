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

    login: function() {
        var self = this;
        console.log('login');
        axios.get('/api/auth', {
            headers: {
                'user': 'wordup2017',
                'pass': 'hackaton'
            }
        })
            .then(function () {
                self.getNewPosts();
            })
    }

    getNewPosts: function() {
        var self = this;
        axios.get('/api/getNewPosts')
            .then(function (response) {
                self.update(response);
                self.addPromptToDoc();
            })
    }

    update: function(response) {
        let promptItems = this.populatePrompts(response.data.data.children);
        this.setState({
            //selectedPrompt: response.data.data.children[0].data.title,
            prompts: promptItems,
        });
    }

    populatePrompts : function(children) {
        let promptItems = []; 
        for (let child of children)
        {
            promptItems.push(child.data);
        }
        return promptItems;
    }

    addPromptToDoc = async () => {
        await Word.run(async (context) => {
            var body = context.document.body;
            body.insertParagraph(this.state.selectedPrompt, Word.InsertLocation.start);
            await context.sync();
        });
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
