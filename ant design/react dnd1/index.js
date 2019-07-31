import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

const style = {
    width: 400
}

const Container = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'write a cool js library'
        },
        {
            id: 2,
            text: 'read a book'
        },
        {
            id: 3,
            text: 'say a word'
        },
        {
            id: 4,
            text: 'help people'
        },
        {
            id: 5,
            text: 'let me see'
        },
        {
            id: 6,
            text: 'oh shit'
        },
        {
            id: 7,
            text: 'oh my god'
        },
        {
            id: 8,
            text: 'ha ha ha'
        }
    ]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const data = JSON.parse(JSON.stringify(cards));
        let tmp = data[dragIndex]; // 临时储存文件
        data.splice(dragIndex, 1); // 移除拖拽项
        data.splice(hoverIndex, 0, tmp);
        setCards(data);
    }, [cards]);

    const renderCard = (card, index) => {
        return (
            <Card
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
            />
        )
    }

    return (
        <div style={style}>
            {cards.map((card, index) => renderCard(card, index))}
        </div>
    )
}

function List() {
    return (
        <div className="list">
            <DndProvider backend={HTML5Backend}>
                <Container />
            </DndProvider>
        </div>
    )
}

export default List;