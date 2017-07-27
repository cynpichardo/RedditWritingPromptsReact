import * as React from 'react';

export interface HeroListItem {
    author: string;
    title: string;
}

export interface HeroListProps {
    items: HeroListItem[]
}

export class HeroList extends React.Component<HeroListProps, any> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const listItems = this.props.items.map((item, index) => (
            <li className='ms-ListBasicExample-itemCell' key={index} onClick={this.addPromptToDoc.bind(this, item)} data-is-focusable={ true }>
                <span className='ms-ListBasicExample-itemName'>{item.author}</span>
                <p className='ms-font-m ms-fontColor-neutralPrimary'>{item.title}</p>
                <br/><br/>
            </li>
        ));
        return (
            <main className='ms-welcome__main'>
                <ul className='ms-List ms-welcome__features ms-u-slideUpIn10'>
                    {listItems}
                </ul>
                {this.props.children}
            </main>
        );
    };

     async addPromptToDoc(item)  {
        await Word.run(async function(context) {
            var body = context.document.body;
            body.insertParagraph(item.title, Word.InsertLocation.start);
            await context.sync();
        });
    }

};
