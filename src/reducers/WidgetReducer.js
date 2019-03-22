import WidgetService from "../services/WidgetService";

let widgetService = WidgetService.getInstance();

const widgetReducer = (state = {widgets: [], previewing: false}, action) => {
    switch (action.type) {
        case "FIND_ALL_WIDGETS_FOR_TOPIC":
            widgetService.setWidgets(action.widgets);
            widgetService.setWidgetsToDelete([]);
            state.widgets = Object.assign([], action.widgets);
            return {
                widgets: state.widgets,
                previewing: action.previewing
            };
        case "CREATE_WIDGET":
            let newWidgets = [
                ...widgetService.getWidgets(),
                action.widget
            ];
            widgetService.setWidgets(newWidgets);
            state.widgets = Object.assign([], newWidgets);
            return {
                widgets: state.widgets
            };
        case "UPDATE_WIDGET":
            let oldWidgets = Object.assign([], widgetService.getWidgets());
            oldWidgets[action.widgetIndex] = Object.assign({}, action.widget);
            widgetService.setWidgets(oldWidgets);
            state.widgets = Object.assign([], oldWidgets);
            return {
                widgets: state.widgets
            };
        case "DELETE_WIDGET":
            oldWidgets = Object.assign([], widgetService.getWidgets());
            if (oldWidgets[action.widgetIndex].id !== undefined) {
                widgetService.addToWidgetsToDelete(oldWidgets[action.widgetIndex].id)
            }
            oldWidgets.splice(action.widgetIndex, 1);
            widgetService.setWidgets(oldWidgets);
            state.widgets = Object.assign([], oldWidgets);
            return {
                widgets: state.widgets
            };
        case "MOVE_WIDGET_UP":
            oldWidgets = Object.assign([], widgetService.getWidgets());
            oldWidgets.splice(action.widgetIndex - 1, 0, oldWidgets.splice(action.widgetIndex, 1)[0]);
            widgetService.setWidgets(oldWidgets);
            state.widgets = Object.assign([], oldWidgets);
            return {
                widgets: state.widgets
            };
        case "MOVE_WIDGET_DOWN":
            oldWidgets = Object.assign([], widgetService.getWidgets());
            oldWidgets.splice(action.widgetIndex + 1, 0, oldWidgets.splice(action.widgetIndex, 1)[0]);
            widgetService.setWidgets(oldWidgets);
            state.widgets = Object.assign([], oldWidgets);
            return {
                widgets: state.widgets
            };
        case "SAVE_WIDGET_LIST":
            widgetService.saveWidgetList(
                action.userId,
                action.courseId,
                action.moduleId,
                action.lessonId,
                action.topicId,
                action.widgets
            );
            widgetService.findAllWidgets(
                action.userId,
                action.courseId,
                action.moduleId,
                action.lessonId,
                action.topicId
            ).then(widgets => {
                widgetService.setWidgets(widgets);
                widgetService.setWidgetsToDelete([]);
                state.widgets = Object.assign([], widgets)
            });
            return {
                widgets: state.widgets
            };
        case "TOGGLE_PREVIEW_MODE":
            return {
                widgets: state.widgets,
                previewing: !state.previewing
            };
        default:
            return state;
    }
};

export default widgetReducer;