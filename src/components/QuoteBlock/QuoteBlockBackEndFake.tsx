// тут у нас будет дата получаемая с бекенда, которая пока не понятно что где и как

export const backEndFake: { quoteList: Array<{ quote: string; author: string }> } = {
    quoteList: [
        {
            quote: `Есть только два способа прожить свою жизнь. Первый — так, будто никаких чудес не бывает. Второй — так, будто всё на свете является чудом`,
            author: "Альберт Эйнштейн",
        },
        {
            quote: `Никогда не поздно стать тем, кем тебе хочется быть.`,
            author: "Джордж Элиот",
        },
        {
            quote: `Если ты способен выдумать что-то, ты можешь и сделать это.`,
            author: "Уолт Дисней",
        },
        {
            quote: `Когда человек не знает к какой пристани он держит путь, для него ни один ветер не будет попутным.`,
            author: "Сенека",
        },
        {
            quote: `Гонясь за недостижимым, мы совершаем невозможное.`,
            author: "Роберт Ардри",
        },
        {
            quote: `Истинное назначение человека — жить, а не существовать.`,
            author: " Джек Лондон",
        },
    ],
};
