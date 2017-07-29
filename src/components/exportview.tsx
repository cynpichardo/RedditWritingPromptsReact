import * as React from 'react';
import { HeroList, HeroListItem } from './hero-list';
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
        this.convertToMarkdown = this.convertToMarkdown.bind(this);
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
            var bodyHtml = documentBody.getHtml();
            //var documentSel = context.document.getSelection();
            //var selHtml = documentSel.getHtml();
            this.print("async:" + Object.keys(bodyHtml));
            //this.print("async:" + (bodyHtml.value);
            await context.sync();
            this.print("then:" + Object.keys(bodyHtml));
            //this.convertToMarkdown(bodyHtml.value);
            this.setState({
                documentBody: bodyHtml.value
            });            
        });
    }

    print(str){
    axios.get('/api/debugPrint', {
        headers: {
            'html': str
        }
    });
    }

    convertToMarkdown(htmlStr) {
        var testText = '<html> <head> <meta http-equiv=Content-Type content="text/html; charset=utf-8"> <meta name=Generator content="Microsoft Word 15 (filtered)"> <style> <!-- /* Font Definitions */ @font-face {font-family:"Cambria Math"; panose-1:2 4 5 3 5 4 6 3 2 4;} @font-face {font-family:DengXian; panose-1:2 1 6 0 3 1 1 1 1 1;} @font-face {font-family:Calibri; panose-1:2 15 5 2 2 2 4 3 2 4;} @font-face {font-family:"\@DengXian"; panose-1:2 1 6 0 3 1 1 1 1 1;} /* Style Definitions */ p.MsoNormal, li.MsoNormal, div.MsoNormal {margin-top:0in; margin-right:0in; margin-bottom:8.0pt; margin-left:0in; line-height:107%; font-size:11.0pt; font-family:"Calibri",sans-serif;} .MsoChpDefault {font-family:"Calibri",sans-serif;} .MsoPapDefault {margin-bottom:8.0pt; line-height:107%;} @page WordSection1 {size:8.5in 11.0in; margin:1.0in 1.0in 1.0in 1.0in;} div.WordSection1 {page:WordSection1;} --> </style> </head> <body lang=EN-US> <div class=WordSection1> <p class=MsoNormal><span lang=ES-MX>My <b>answer </b>la la la <i>klskdl </i>lkdj <u>ldklsk </u></span></p> <p class=MsoNormal>&nbsp;</p> </div> </body> </html>';
        this.print('context');
        this.print(htmlStr);
        var htmlText = htmlStr;

            axios.get('/api/convertToMarkdown', {
                headers: {
                    'html': htmlText
                }
            })
            .then(function (response) {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(response.data.markdown, 'text/html');
                var markdown = htmlDoc.getElementsByTagName("span")[0].innerText;
                console.log(markdown);
                this.setState({
                    responseMarkdown: markdown
                });
            }.bind(this))
    }

    render() {
        
        const docBody = this.state.documentBody;
        const markdown = this.state.responseMarkdown;
        if (docBody && !markdown) {
            this.print('render');
            this.convertToMarkdown(docBody);
        }
        
            
        return (
            <div className='ms-welcome'> 
                <HeroList message='Export your prompt response to Reddit!' items={this.state.exportGuide}>
                    <PrimaryButton className= 'ms-welcome__action' onClick= { this.export } > Export </PrimaryButton>
                    <p> {this.state.responseMarkdown} </p>
                    <p> {this.state.documentBody} </p>

                </HeroList>
            </div>
        );
    }
};
