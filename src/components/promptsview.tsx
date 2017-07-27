import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { PromptsList, PromptsListItem } from './promptslist';
import axios from 'axios';

export interface PromptsViewProps {
    title: string;
}

export interface PromptsViewState {
    newPrompts: PromptsListItem[];
    hotPrompts: PromptsListItem[];
    risingPrompts: PromptsListItem[];
    selectedPrompt: string;
    exportAvailable: boolean;
    documentBody: string;
    
}

export class PromptsView extends React.Component<PromptsViewProps, PromptsViewState> {
    constructor(props, context) {
        super(props, context);
        this.getNewPosts = this.getNewPosts.bind(this);
        this.state = {
            newPrompts: [],
            hotPrompts: [],
            risingPrompts: [],
            selectedPrompt: '',
            documentBody: '',
            exportAvailable: false
        };
    }

    componentDidMount() {
        this.getNewPosts();
        this.getHotPosts();
        this.getRisingPosts();
        this.setState({
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
                    exportAvailable: true
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
        return (
            <div className='ms-welcome'>
                <Pivot>
                    <PivotItem linkText='New'>
                        <PromptsList items={this.state.newPrompts}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='Hot'>
                        <PromptsList items={this.state.hotPrompts}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='Rising'>
                        <PromptsList items={this.state.risingPrompts}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='Export'>
                        
                    </PivotItem>
                </Pivot>
            </div>
        );
    }
};
