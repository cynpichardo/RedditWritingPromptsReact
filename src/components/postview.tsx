import * as React from 'react';
import axios from 'axios';

export interface PostViewProps {
    replyHtml: string;
}

export interface PostViewState {
    replyMarkdown: string;
}

export class PostView extends React.Component<PostViewProps, PostViewState> {
    constructor(props, context) {
        super(props, context);
        this.print = this.print.bind(this);
        this.convertToMarkdown = this.convertToMarkdown.bind(this);
        this.state = {
            replyMarkdown: ''
        };
    }

    componentDidMount() {
        this.print('mount');
        //this.print('props:'+this.props.replyHtml);
        //this.convertToMarkdown();
        this.setState({
        });
    }

    convertToMarkdown() {
        //var testText = '<html> <head> <meta http-equiv=Content-Type content="text/html; charset=utf-8"> <meta name=Generator content="Microsoft Word 15 (filtered)"> <style> <!-- /* Font Definitions */ @font-face {font-family:"Cambria Math"; panose-1:2 4 5 3 5 4 6 3 2 4;} @font-face {font-family:DengXian; panose-1:2 1 6 0 3 1 1 1 1 1;} @font-face {font-family:Calibri; panose-1:2 15 5 2 2 2 4 3 2 4;} @font-face {font-family:"\@DengXian"; panose-1:2 1 6 0 3 1 1 1 1 1;} /* Style Definitions */ p.MsoNormal, li.MsoNormal, div.MsoNormal {margin-top:0in; margin-right:0in; margin-bottom:8.0pt; margin-left:0in; line-height:107%; font-size:11.0pt; font-family:"Calibri",sans-serif;} .MsoChpDefault {font-family:"Calibri",sans-serif;} .MsoPapDefault {margin-bottom:8.0pt; line-height:107%;} @page WordSection1 {size:8.5in 11.0in; margin:1.0in 1.0in 1.0in 1.0in;} div.WordSection1 {page:WordSection1;} --> </style> </head> <body lang=EN-US> <div class=WordSection1> <p class=MsoNormal><span lang=ES-MX>My <b>answer </b>la la la <i>klskdl </i>lkdj <u>ldklsk </u></span></p> <p class=MsoNormal>&nbsp;</p> </div> </body> </html>';
        this.print('convert');
        var testText = '<body>a b c</body>';
        var htmlText = testText;
        this.print('convert:'+htmlText);
        axios.get('/api/convertToMarkdown', {
            headers: {
                'html': htmlText
            }
        })
            .then(function (response) {
                this.print('then');
                this.print('response:' + response.data.markdown);
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(response.data.markdown, 'text/html');
                var markdown = htmlDoc.getElementsByTagName("span")[0].innerText;
                this.print('then markdown:'+markdown);
                this.setState({
                    replyMarkdown: markdown
                });
            }.bind(this))
    }

    print(str) {
        axios.get('/api/debugPrint', {
            headers: {
                'html': str
            }
        });
    }

    render() {
        return (
            <div className="ms-welcome__main">
                <p> {this.props.replyHtml} </p>
                <p> {this.state.replyMarkdown} </p>
            </div>
        );
    }
};
