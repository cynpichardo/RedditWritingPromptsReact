import * as React from 'react';
import { HeroList, HeroListItem } from './hero-list';
import { PostView } from './postview';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import axios from 'axios';

export interface ExportViewProps {
    selectedPrompt: string;
}

export interface ExportViewState {
    promptResponse: string;
    responseMarkdown: string;
    documentBody: string;
    documentSel: string;
    exportGuide: HeroListItem[];
}

export class ExportView extends React.Component<ExportViewProps, ExportViewState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            promptResponse: '',
            responseMarkdown: '',
            documentBody: '',
            documentSel: '',
            exportGuide: []
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
        /*
        await Word.run(async (context) => {
            var documentBody = context.document.body;
            var bodyHtml = documentBody.getHtml();
            //var documentSel = context.document.getSelection();
            //var selHtml = documentSel.getHtml();
            //this.print("async:" + Object.keys(bodyHtml));
            await context.sync();
            //this.print("thenn:" + Object.keys(bodyHtml));
            //this.print("thenn value:"+bodyHtml);
            //this.convertToMarkdown(bodyHtml.value);
            this.setState({
                documentBody: bodyHtml.value
            });            
        });
        */
        this.setState({
                documentBody: 'abc'
            });
    }

    print(str){
    axios.get('/api/debugPrint', {
        headers: {
            'html': str
        }
    });
    }

    render() {
        const docBody = this.state.documentBody;
            return (
                <div className='ms-welcome'> {
                    docBody ? <PostView replyHtml={docBody}/>
                        : <div className='ms-welcome'>
                            <HeroList message='Export your prompt response to Reddit!' items={this.state.exportGuide}>
                                <p> You'll be replying to the prompt: </p>
                                <p> {this.props.selectedPrompt} </p>
                                <PrimaryButton className= 'ms-welcome__action' onClick= { this.export.bind(this) } > Export Response </PrimaryButton>
                            </HeroList>
                        </div>;
                 </div>
        );
    }
};
