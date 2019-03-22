import {connect} from 'react-redux'
import WidgetList from '../components/WidgetList'

const stateToPropertyMapper = state => ({
    widgets: state.widgets,
    previewing: state.previewing
});

const dispatchToPropertyMapper = dispatch => ({
    findAllWidgetsForTopic: (userId, courseId, moduleId, lessonId, topicId) => dispatch({
        type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
        userId: userId,
        courseId: courseId,
        moduleId: moduleId,
        lessonId: lessonId,
        topicId: topicId
    }),
    createWidget: newWidget => dispatch({
        type: 'CREATE_WIDGET',
        widget: newWidget
    }),
    updateWidget: (widgetIndex, updatedWidget) => dispatch({
        type: 'UPDATE_WIDGET',
        widgetIndex: widgetIndex,
        widget: updatedWidget
    }),
    deleteWidget: widgetIndex => dispatch({
        type: 'DELETE_WIDGET',
        widgetIndex: widgetIndex
    }),
    moveWidgetUp: widgetIndex => dispatch({
        type: "MOVE_WIDGET_UP",
        widgetIndex: widgetIndex
    }),
    moveWidgetDown: widgetIndex => dispatch({
        type: 'MOVE_WIDGET_DOWN',
        widgetIndex: widgetIndex
    }),
    saveWidgetList: (userId, courseId, moduleId, lessonId, topicId, widgets) => dispatch({
        type: 'SAVE_WIDGET_LIST',
        userId: userId,
        courseId: courseId,
        moduleId: moduleId,
        lessonId: lessonId,
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
