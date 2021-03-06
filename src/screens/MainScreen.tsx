import React from "react";
import styled from "@emotion/styled";
import { ScreenWrapper } from "components/ScreenWrapper";
import { MoodObject } from "modules/MoodHistory/types";
import { connect } from "react-redux";
import { moodsActions } from "modules/MoodHistory/slice";
import { quotesActions } from "modules/QuoteBlock/slice";
import { pick } from "ramda";
import { QuoteObject } from "modules/QuoteBlock/types";
import { MoodDiaryState } from "src/store";
import { MoodHistory, QuoteBlock, ResultAnalise } from "src/modules";
import { QUOTE_BLOCK_DEFAULT_INTERVAL } from "modules/QuoteBlock/consts";

const MainScreenWrapper = styled.div`
    display: flex;
    width: 99%;
    max-width: 99%;
    flex-direction: column;
    position: absolute;
    max-height: 99%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    overflow: hidden;
    height: inherit;
    margin-left: 20px;
`;

const MainScreenDataWrapper = styled.div`
    display: inline-flex;
    width: 100%;
    flex-direction: row;
    overflow-x: hidden;
    min-height: 100%;
`;

const HistoryBlockWrapper = styled.div`
    display: inline-flex;
    border-right: 2px solid lightgray;
    margin-right: 10px;
    overflow: hidden;
    width: 550px;
    max-width: 550px;
    min-width: 550px;
`;

const RightBlockWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    width: 800px;
`;

const GraphBlockWrapper = styled.div`
    display: inline-flex;
    align-self: flex-start;
    flex-direction: column;
    width: 100%;
`;

const QuoteBlockWrapper = styled.div`
    display: inline-flex;
    align-self: flex-end;
    width: 100%;
    justify-content: center;
`;

function mapStateToProps(state: MoodDiaryState): { moods: MoodObject[]; quotes: QuoteObject[] } {
    return pick(["moods", "quotes"], state);
}

const mapDispatchToProps = {
    loadMoods: moodsActions.loadMoods,
    loadQuotes: quotesActions.loadQuotes,
};

type RawMainScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

/**
 Главная страница, авторизованный пользователь всегда попадает на нее.
 */
class RawMainScreen extends React.Component<RawMainScreenProps, {}> {
    componentDidMount() {
        this.props.loadMoods();
        this.props.loadQuotes();
    }

    render() {
        const { moods, quotes } = this.props;
        return (
            <ScreenWrapper>
                <MainScreenWrapper data-testid="main-screen-data-test-id">
                    <MainScreenDataWrapper>
                        <HistoryBlockWrapper>
                            <MoodHistory moodList={moods} />
                        </HistoryBlockWrapper>
                        <RightBlockWrapper>
                            <GraphBlockWrapper>
                                <ResultAnalise moodList={moods} />
                            </GraphBlockWrapper>
                            <QuoteBlockWrapper>
                                <QuoteBlock interval={QUOTE_BLOCK_DEFAULT_INTERVAL} isAutoSwitchEnabled={true} quoteList={quotes} />
                            </QuoteBlockWrapper>
                        </RightBlockWrapper>
                    </MainScreenDataWrapper>
                </MainScreenWrapper>
            </ScreenWrapper>
        );
    }
}

const MainScreen = connect(mapStateToProps, mapDispatchToProps)(RawMainScreen);

export default MainScreen;
