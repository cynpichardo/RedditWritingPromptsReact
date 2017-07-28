import * as React from 'react';
import { ExportView } from './exportview';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { PromptsList, PromptsListItem } from './promptslist';

export interface PromptsViewProps {
    newPrompts: PromptsListItem[];
    hotPrompts: PromptsListItem[];
    risingPrompts: PromptsListItem[];
}

export interface PromptsViewState {
    selectedPrompt: string;
    exportAvailable: boolean;
    documentBody: string;
    
}

export class PromptsView extends React.Component<PromptsViewProps, PromptsViewState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedPrompt: '',
            documentBody: '',
            exportAvailable: false
        };
    }

    componentDidMount() {

    }

    render() {        
        return (
            <div className='ms-welcome'>
                <Pivot>
                    <PivotItem linkText='Hot'>
                        <PromptsList items={this.props.hotPrompts}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='New'>
                        <PromptsList items={this.props.newPrompts}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='Rising'>
                        <PromptsList items={this.props.risingPrompts}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='Export'>
                        <ExportView selectedPrompt={this.state.selectedPrompt}/>
                    </PivotItem>
                </Pivot>
            </div>
        );
    }
};
