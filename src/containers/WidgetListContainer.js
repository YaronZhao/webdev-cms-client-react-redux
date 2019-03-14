import React from 'react'
import {connect} from 'react-redux'
import WidgetList from '../components/WidgetList'

const stateToPropertyMapper = state => ({
    widgets: state.widgets,
    currentTopicId: state.topicId,
    previewing: state.previewing
});

const dispatchToPropertyMapper = dispatch => ({
    createWidget: (topicId, widget) => dispatch({
        type: 'CREATE_WIDGET',
        topicId: topicId,
        widget: widget
    }),
    deleteWidget: widgetId => dispatch({
        type: 'DELETE_WIDGET',
        widgetId: widgetId
    }),
    updateWidget: (widgetId, widget) => dispatch({
        type: 'UPDATE_WIDGET',
        widgetId: widgetId,
        widget: widget
    }),
    findWidget: widgetId => dispatch({
        type: 'FIND_WIDGET',
        widgetId: widgetId
    }),
    findWidgets: topicId => dispatch({
        type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
        topicId: topicId
    }),
    findAllWidgets: () => dispatch({
        type: 'FIND_ALL_WIDGETS'
    }),
    moveWidgetUp: (widgetId, fromIndex) => dispatch({
        type: "MOVE_WIDGET_UP",
        widgetId: widgetId,
        fromIndex: fromIndex
    }),
    moveWidgetDown: (widgetId, fromIndex) => dispatch({
        type: 'MOVE_WIDGET_DOWN',
        widgetId: widgetId,
        fromIndex: fromIndex
    }),
    saveWidgetList: (topicId, widgets) => dispatch({
        type: 'SAVE_WIDGET_LIST',
        topicId: topicId,
        widgets: widgets
    }),
    togglePreviewMode: () => dispatch({
        type: 'TOGGLE_PREVIEW_MODE'
    })
});

const WidgetListContainer =
    connect(stateToPropertyMapper,
            dispatchToPropertyMapper)(WidgetList);

export default WidgetListContainer;
