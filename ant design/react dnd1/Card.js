import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '0.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const ItemTypes = {
    CARD: 'card',
};

const Card = ({ key, index, id, text, moveCard }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;//拖拽目标的Index
            const hoverIndex = index;//放置目标Index
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, index },
        canDrag: monitor => index > 0,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
    })
    const opacity = isDragging ? 0.1 : 1;
    drag(drop(ref));
    return (
        <div ref={ref} style={{...style, opacity}}>{text}</div>
    )
};

export default Card;