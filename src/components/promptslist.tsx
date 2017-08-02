import * as React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import './promptsliststyle.css';

export interface PromptsListItem {
    author: string;
    title: string;
    score: number;
}

export interface PromptsListProps {
    items: PromptsListItem[];
    handleClick: () => void;
}

export class PromptsList extends React.Component<PromptsListProps, any> {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item) {
        this.props.handleClick(item);
    }

    render() {
        let { items} = this.props;
        return (
            <FocusZone direction={ FocusZoneDirection.vertical }>
                <List
                    items={ items }
                    onRenderCell={ (item, index) => (
                        <div className='ms-ListBasicExample-itemCell' onClick={() => this.handleClick(item)} data-is-focusable={ true }>
                            <div className='ms-ListBasicExample-itemImage'>
                                <div>
                                    <Icon className='ms-ListBasicExample-chevronScore'
                                    iconName='Up'/> </div>
                                <div > <span> { item.score } </span> </div>
                                <div> <Icon className='ms-ListBasicExample-chevronScore'
                                    iconName='Down'/> </div>
                            </div>
                            <div className='ms-ListBasicExample-itemContent'>
                                <div className='ms-ListBasicExample-itemName'>{ item.title }</div>
                                <div className='ms-ListBasicExample-itemIndex'>by { item.author }</div>
                            </div>
                            <Icon className='ms-ListBasicExample-chevron'
                                iconName='ChevronRight'/>
                        </div>
                    ) }
                    />
            </FocusZone>
        );
    }

};
