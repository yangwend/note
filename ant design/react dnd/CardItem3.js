import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import { Card } from 'antd'
import { DragSource, DropTarget } from 'react-dnd';

const Types = {
    CARD: 'CARD'
};
const CardSource = {
    beginDrag(props, monitor, component) {
        return {
            index: props.index
        }
    }
};
const CardTarget = {
    canDrop(props, monitor) { //组件可以被放置时触发的事件

    },
    hover(props, monitor, component) { //组件在target上方时触发的事件
        if (!component) return null; //异常处理判断
        const dragIndex = monitor.getItem().index;//拖拽目标的Index
        const hoverIndex = props.index; //放置目标Index
        if (dragIndex === hoverIndex) return null;// 如果拖拽目标和放置目标相同的话，停止执行

        //如果不做以下处理，则卡片移动到另一个卡片上就会进行交换，下方处理使得卡片能够在跨过中心线后进行交换.
        const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();//获取卡片的边框矩形
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;//获取X轴中点
        const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
        const hoverClientX = (clientOffset).x - hoverBoundingRect.left;
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) { // 从前往后放置
            return null
        }
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) { // 从后往前放置
            return null
        }
        props.onDND(dragIndex, hoverIndex); //调用App.js中方法完成交换
        monitor.getItem().index = hoverIndex; //重新赋值index，否则会出现无限交换情况
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function collect1(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}

@DragSource(Types.CARD, CardSource, collect)
@DropTarget(Types.CARD, CardTarget, collect1)
export default class CardItem extends Component {
    render() {
        const { isDragging, connectDragSource, connectDropTarget } = this.props;
        let opacity = isDragging ? 0.1 : 1;

        return connectDragSource(
            connectDropTarget(<div>
                <Card
                    title={this.props.title}
                    style={{ width: 300, opacity }}
                >
                    <p>{this.props.content}</p>
                </Card>
            </div>)
        )
    }
}