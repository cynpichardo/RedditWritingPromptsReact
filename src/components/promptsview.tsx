import * as React from 'react';
import { Header } from './header';
import { HeroList, HeroListItem } from './hero-list';
import { LoginControl } from './logincontrol';
import { HomeView } from './homeview';
import { ExportDoc } from './exportdoc';
import axios from 'axios';

export interface PromptsViewProps {
    title: string;
}

export interface PromptsViewState {
    prompts: HeroListItem[];
    selectedPrompt: string;
    exportAvailable: boolean;
    documentBody: string;
    
}

export class PromptsView extends React.Component<PromptsViewProps, PromptsViewState> {
    constructor(props, context) {
        super(props, context);
        this.getNewPosts = this.getNewPosts.bind(this);
        this.state = {
            prompts: [],
            selectedPrompt: '',
            documentBody: '',
            exportAvailable: false
        };
    },

    componentDidMount() {
        this.getNewPosts();
        this.setState({
        });
    },

    getNewPosts() {
        axios.get('/api/getNewPosts')
            .then(function (response) {
                this.populatePrompts(response.data.data.children);
                this.setState({
                    selectedPrompt: response.data.data.children[0].data.title,
                    exportAvailable: true
                });
            }.bind(this))
    },

    populatePrompts(items) {
        var promptItems = [];
        for (var item of items) {
            promptItems.push(item.data);
        }
        this.setState({
            prompts: promptItems,
            exportAvailable: true
        });
    }

    render() {        
        return (
            <div className='ms-welcome'>
                <HeroList items={this.state.prompts}>
                </HeroList>
            </div>
        );
    }
};
