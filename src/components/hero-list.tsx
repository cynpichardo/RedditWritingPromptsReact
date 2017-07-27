import * as React from 'react';

export interface HeroListItem {
    author: string;
    title: string;
}

export interface HeroListProps {
    message: string;
    items: HeroListItem[]
}

export class HeroList extends React.Component<HeroListProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const listItems = this.props.items.map((item, index) => (
            <li className='ms-ListItem' key={index} onClick={this.addPromptToDoc.bind(this, item)}>
                <i className={`ms-Icon ms-Icon--${item.author}`}></i>
                <span className='ms-font-m ms-fontColor-neutralPrimary'>{item.title}</span>
            </li>
        ));
        return (
            <main className='ms-welcome__main'>
                <h2 className='ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20'>{this.props.message}</h2>
                <ul className='ms-List ms-welcome__features ms-u-slideUpIn10'>
                    {listItems}
                </ul>
                {this.props.children}
            </main>
        );
    };

     async addPromptToDoc(item, event)  {
        await Word.run(async function(context) {
            var body = context.document.body;
            body.insertParagraph(item.title, Word.InsertLocation.start);
            await context.sync();
        });
    }

};
