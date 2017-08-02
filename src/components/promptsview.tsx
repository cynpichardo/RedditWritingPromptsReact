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
        this.selectPrompt = this.selectPrompt.bind(this);
        this.addPromptToDoc = this.addPromptToDoc.bind(this);
        this.state = {
            selectedPrompt: '',
            documentBody: '',
            exportAvailable: false
        };
    }

    componentDidMount() {

    }

    selectPrompt(item) {
        console.log("selectedPrompt");
        console.log(item);
        this.setState({
            selectedPrompt: item.title
        });
        //this.addPromptToDoc(item.title);
    }

    async addPromptToDoc(item) {
        await Word.run(async function (context) {
            var body = context.document.body;
            body.insertParagraph(item.title, Word.InsertLocation.start);
            await context.sync();
        });
    }

    render() {        
        return (
            <div className='ms-welcome'>
                <Pivot>
                    <PivotItem linkText='Hot'>
                        <PromptsList items={this.props.hotPrompts} handleClick={this.selectPrompt}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='New'>
                        <PromptsList items={this.props.newPrompts} handleClick={this.selectPrompt}>
                        </PromptsList>
                    </PivotItem>
                    <PivotItem linkText='Rising'>
                        <PromptsList items={this.props.risingPrompts} handleClick={this.selectPrompt}>
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
