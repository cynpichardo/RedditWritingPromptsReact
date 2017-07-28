import * as React from 'react';
import { HeroList, HeroListItem } from './hero-list';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import axios from 'axios';

export interface ExportViewProps {
    selectedPrompt: string;
}

export interface ExportViewState {
    promptResponse: string;
    documentBody: string;
    documentSel: string;
    exportGuide: HeroListItem[];
}

export class ExportView extends React.Component<ExportViewProps, ExportViewState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            promptResponse: '',
            documentBody: '',
            documentSel: '',
            exportGuide: [];
        };
    }

    componentDidMount() {
        this.export = this.export.bind(this);
        this.setState({
            exportGuide: [
                {
                    icon: 'RadioBullet',
                    primaryText: 'Select in the document the text you want to post'
                },
                {
                    icon: 'RadioBullet',
                    primaryText: 'If you want to post the whole document, do not select anything'
                },
                {
                    icon: 'RadioBullet',
                    primaryText: 'Click Export to Reddit when you are ready'
                }
            ]
        });
    }

    async export() {
        await Word.run(async (context) => {
            var documentBody = context.document.body;
            context.load(documentBody, 'text');
            var documentSel = context.document.getSelection();
            context.load(documentSel);           
            await context.sync();
            var add = documentSel ? documentSel.text : documentBody.text;
            this.setState({
                promptResponse: add,
                documentSel: documentSel.text,
                documentBody: documentBody.text
            }, function () {
                this.convertToMarkdown();
            });
        });
    },

    convertToMarkdown() {
        var promptResponse = this.state.documentSel ? this.state.documentSel : this.state.documentBody;
        this.setState({
           promptResponse: promptResponse
        }
    }

    render() {        
        return (
            <div className='ms-welcome'> 
                <HeroList message='Export your prompt response to Reddit!' items={this.state.exportGuide}>
                    <PrimaryButton className= 'ms-welcome__action' onClick= { this.export } > Export </PrimaryButton>
                    <p> {this.state.promptResponse} </p>
                </HeroList>
                
            </div>
        );
    }
};
