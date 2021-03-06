import React from "react";
import styled from "@emotion/styled";
import { QuoteObject, Steps, StepsTypes } from "./types";
import { getNewQuoteId, getRandomIndex } from "./utils";

interface QuoteBlockProps {
    interval: number;
    isAutoSwitchEnabled: boolean;
    quoteList: QuoteObject[];
}

interface QuoteBlockState {
    quoteIndex: number;
}

const QuoteWrapper = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    border-radius: 25px;
    background-color: #2f7f80;
    min-height: 100px;
    max-width: 550px;
`;
const QuoteBlockView = styled.span`
    position: relative;
    font-size: medium;
    line-height: 24px;
    text-decoration-style: unset;
    color: white;
    font-style: italic;

    footer {
        font-size: 0.8em;
        font-weight: 700;
        color: darken($white, 15%);
        float: right;

        &:before {
            content: "\\2015";
        }
    }
`;

const QuoteButton = styled.a`
    text-decoration: none;
    display: block;
    background-color: transparent;
    align-items: center;
    height: fit-content;
    align-self: center;
    padding-right: 10px;
    font-weight: bold;
    font-size: 25px;
    padding-left: 10px;
    color: white;
`;

/**
 * компонент для оборажения блока с цитатами
 * */
export class QuoteBlock extends React.Component<QuoteBlockProps, QuoteBlockState> {
    intervalID?: NodeJS.Timeout;
    _isMounted = false;

    state: QuoteBlockState = {
        quoteIndex: 0,
    };

    componentDidMount() {
        const { interval, isAutoSwitchEnabled } = this.props;
        if (isAutoSwitchEnabled) {
            this.intervalID = setInterval(this.setRandomQuote, interval);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<QuoteBlockProps>, nextState: Readonly<QuoteBlockState>): boolean {
        return (
            this.state.quoteIndex !== nextState.quoteIndex ||
            this.props.interval !== nextProps.interval ||
            this.props.isAutoSwitchEnabled !== nextProps.isAutoSwitchEnabled ||
            this.props.quoteList.length !== nextProps.quoteList.length
        );
    }

    componentDidUpdate(prevProps: QuoteBlockProps) {
        const didPropsChanged = prevProps.interval !== this.props.interval || this.props.isAutoSwitchEnabled !== prevProps.isAutoSwitchEnabled;
        if (didPropsChanged) {
            this.clearWorker();
            if (this.props.isAutoSwitchEnabled) {
                this.intervalID = setInterval(this.setRandomQuote, this.props.interval);
            }
        }
    }

    componentWillUnmount() {
        this.clearWorker();
    }

    setRandomQuote = () => {
        const { quoteList } = this.props;
        const { quoteIndex } = this.state;
        let newId = quoteIndex;
        while (newId === quoteIndex) {
            newId = getRandomIndex(quoteList.length);
        }
        this.setState({ quoteIndex: newId });
    };

    setQuote = (position: StepsTypes) => {
        this.setState({ quoteIndex: getNewQuoteId(this.state.quoteIndex, this.props.quoteList.length, position) });
    };

    clearWorker = () => {
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = undefined;
        }
    };

    render() {
        const { quoteIndex } = this.state;
        const { quoteList } = this.props;
        if (!quoteList || quoteList.length == 0) {
            return <></>;
        }
        return (
            <QuoteWrapper>
                <QuoteButton onClick={() => this.setQuote(Steps.PREVIOUS)}>{"<"}</QuoteButton>
                <QuoteBlockView>
                    {quoteList[quoteIndex]?.quote}
                    <footer>{quoteList[quoteIndex]?.author}</footer>
                </QuoteBlockView>
                <QuoteButton onClick={() => this.setQuote(Steps.NEXT)}>{">"}</QuoteButton>
            </QuoteWrapper>
        );
    }
}
