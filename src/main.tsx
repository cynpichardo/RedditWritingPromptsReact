import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/app';
import './assets/styles/global.scss';

(() => {
    const title = 'RedditWritingPrompts';
    const container = document.querySelector('#container');


    /* Render application after Office initializes */
    Office.initialize = () => {
        render(
            <App title={title} />,
            container
        );
    };

    /* Initial render showing a progress bar */
    //render(<Progress title={title} logo='assets/icon-52.png' message='Please sideload your addin to see app body.' />, container);
    render(
        <App title={title} />,
        container
    );
})();



