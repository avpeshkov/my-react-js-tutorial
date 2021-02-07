import React from "react";
import { storiesOf } from "@storybook/react";
import MoodListView from "modules/MoodHistory/components/MoodListView/MoodListView";
import { MoodObject } from "modules/MoodHistory/types";
import * as faker from "faker";
import styled from "@emotion/styled";

const Window = styled.div`
    height: 500px !important;

    #mood-view-wrapper {
        height: 120px !important;
    }
`;

storiesOf("MoodListView", module).add("with mocked get", () => {
    const data: MoodObject[] = [];
    for (let x = 0; x < 50; x++)
        data.push({
            id: faker.random.uuid(),
            mood: 5,
            date: new Date("December 10, 2020 03:24:00").toString(),
            comment: "Slept all day",
        });

    return (
        <Window>
            <MoodListView moodList={data} editMoodObject={() => {}} deleteMoodRequest={() => {}} />
        </Window>
    );
});
