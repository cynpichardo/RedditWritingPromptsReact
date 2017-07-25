import * as React from 'react';
import { Button, ButtonType } from 'office-ui-fabric-react';
import { Header } from './header';
import { HeroList, HeroListItem } from './hero-list';

export interface AppProps {
    title: string;
}

export interface AppState {
    listItems: HeroListItem[];
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listItems: []
        };
    }

    componentDidMount() {
        this.setState({
            listItems: [
                {
                    icon: 'Ribbon',
                    primaryText: 'Achieve more with Office integration'
                },
                {
                    icon: 'Unlock',
                    primaryText: 'Unlock features and functionality'
                }
            ]
        });
    }

    click = async () => {
        
        await Word.run(async (context) => {
            /**
             * Insert your Word code here
             */
            await context.sync();
        });
        
    }

    render() {
        return (
            <div className='ms-welcome'>
                <Header logo='assets/icon-52.png' title={this.props.title} message='Welcome' />
                <HeroList message='Discover what Reddit Writing Prompts can do!' items={this.state.listItems}>
                    <p className='ms-font-l'>Log into Reddit to start.</p>
                    <Button className='ms-welcome__action' buttonType={ButtonType.hero} icon='ChevronRight' onClick={this.click}>Login</Button>
                </HeroList>
            </div>
        );
    };
};
