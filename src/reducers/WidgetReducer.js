import CourseService from '../services/CourseService'

let courseService = CourseService.getInstance();

const widgetReducer = (state = {widgets: [], previewing: false}, action) => {
    switch (action.type) {
        case "CREATE_WIDGET":
            courseService.createWidget(action.topicId, action.widget);
            return {
                widgets: courseService.findWidgets(action.topicId)
            };
        case "DELETE_WIDGET":
            courseService.deleteWidget(action.widgetId);
            return {
                widgets: courseService.findWidgets(state.topicId)
            };
        case "UPDATE_WIDGET":
            courseService.updateWidget(action.widgetId, action.widget);
            return {
                widgets: courseService.findWidgets(state.topicId)
            };
        case "FIND_WIDGET":
            return {
                widget: courseService.findWidget(action.widgetId)
            };
        case "FIND_ALL_WIDGETS_FOR_TOPIC":
            return {
                topicId: action.topicId,
                widgets: courseService.findWidgets(action.topicId)
            };
        case "FIND_ALL_WIDGETS":
            return {
                widgets: courseService.findAllWidgets()
            };
        case "MOVE_WIDGET_UP":
            courseService.moveWidgetUp(action.widgetId, action.fromIndex);
            return {
                widgets: courseService.findWidgets(state.topicId)
            };
        case "MOVE_WIDGET_DOWN":
            courseService.moveWidgetDown(action.widgetId, action.fromIndex);
            return {
                widgets: courseService.findWidgets(state.topicId)
            };
        case "SAVE_WIDGET_LIST":
            courseService.saveWidgetList(action.topicId, action.widgets);
            return {
                widgets: courseService.findWidgets(action.topicId),
            };
        case "TOGGLE_PREVIEW_MODE":
            return {
                widgets: state.widgets,
                topicId: state.topicId,
                previewing: !state.previewing
            };
        default:
            return state;
    }
};

export default widgetReducer;