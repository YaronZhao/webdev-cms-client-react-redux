import HeadingWidgetService from "./HeadingWidgetService";
import ParagraphWidgetService from "./ParagraphWidgetService";
import ListWidgetService from "./ListWidgetService";
import LinkWidgetService from "./LinkWidgetService";
import ImageWidgetService from "./ImageWidgetService";

let baseURL = "https://webdev-cms-server-mysql-jpa.herokuapp.com/api/user/";

class WidgetService {
    static widgetService = null;

    static getInstance() {
        if (WidgetService.widgetService === null) {
            WidgetService.widgetService = new WidgetService();
        }
        return WidgetService.widgetService
    }

    constructor() {
        // Maintain a list a of widgets on the client side
        // Manipulate this widget list when users perform CRUD operations
        // When users click the "Save" button, the entire list of widgets will be saved into the server
        this.widgets = [];
        this.widgetsToDelete = [];
        this.headingWidgetService = new HeadingWidgetService();
        this.paragraphWidgetService = new ParagraphWidgetService();
        this.listWidgetService = new ListWidgetService();
        this.imageWidgetService = new ImageWidgetService();
        this.linkWidgetService = new LinkWidgetService();
    }

    setWidgets = widgets => {
        this.widgets = widgets
    };

    getWidgets = () => {
        return this.widgets
    };

    setWidgetsToDelete = widgetsToDelete => {
        this.widgetsToDelete = widgetsToDelete
    };

    addToWidgetsToDelete = widgetId => {
        this.widgetsToDelete.push(widgetId)
    };

    updateWidgetToType = (widgetId, type) => {
        switch (type) {
            case 'HEADING':
                return {
                    id: widgetId,
                    type: type,
                    headingSize: 1,
                    headingText: "Heading text"
                };
            case 'PARAGRAPH':
                return {
                    id: widgetId,
                    type: type,
                    paragraphText: "Paragraph text"
                };
            case 'LIST':
                return {
                    id: widgetId,
                    type: type,
                    listStyle: "unordered",
                    listItems: "Enter one list item per line"
                };
            case 'IMAGE':
                return {
                    id: widgetId,
                    type: type,
                    imageSrc: "Image URL"
                };
            case 'LINK':
                return {
                    id: widgetId,
                    type: type,
                    linkTitle: "Link text",
                    linkHref: "Link URL"
                };
            default:
                return null
        }
    };

    saveWidgetList = (userId, courseId, moduleId, lessonId, topicId, widgets) => {
        // First delete original widgets, which have been deleted on the client side, from the database
        for (let widgetId of this.widgetsToDelete) {
            this.deleteWidget(userId, courseId, moduleId, lessonId, topicId, widgetId)
        }
        for (let widget of widgets) {
            if (widget.type === "HEADING") {
                this.headingWidgetService.createHeadingWidget(userId, courseId, moduleId, lessonId, topicId, widget)
                    .then(data => console.log(data))
            } else if (widget.type === "PARAGRAPH") {
                this.paragraphWidgetService.createParagraphWidget(userId, courseId, moduleId, lessonId, topicId, widget)
                    .then(data => console.log(data))
            } else if (widget.type === "LIST") {
                this.listWidgetService.createListWidget(userId, courseId, moduleId, lessonId, topicId, widget)
                    .then(data => console.log(data))
            } else if (widget.type === "IMAGE") {
                this.imageWidgetService.createImageWidget(userId, courseId, moduleId, lessonId, topicId, widget)
                    .then(data => console.log(data))
            } else {
                this.linkWidgetService.createLinkWidget(userId, courseId, moduleId, lessonId, topicId, widget)
                    .then(data => console.log(data))
            }
        }
    };

    createWidget = (userId, courseId, moduleId, lessonId, topicId, newWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget", {
            method: 'POST',
            body: JSON.stringify(newWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllWidgets = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widgets", {
            credentials: 'include',
        }).then(response => response.json());

    findWidgetById = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget/" + widgetId, {
            credentials: 'include',
        }).then(response => response.json());

    updateWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId, updatedWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget/" + widgetId, {
            method: 'PUT',
            body: JSON.stringify(updatedWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget/" + widgetId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default WidgetService;
