
var taskNamespaceOLD = {
    pageAction: "PAGELOAD",
    defaultTasks: [
        {"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
        {"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
        {"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
        {"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
        {"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
        {"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
        {"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
    ],
    appendTask: function(tasks){
        let taskRows = tasks.map((taskObj, i) => {
        // let tRow = '<div class="divRow">'
        //             + '<div class="divCell nameCell">' + taskObj.name + '</div>'
        //             + '<div class="divCell dateCell">' + taskObj.date + '</div>'
        //             + '<div class="divCell">' + taskObj.assigned + '</div>'
        //             + '</div>';
        let tRow = '<div class="divRow">'
                    + '<div class="divCell"><label class="nameCell">'+ taskObj.name + '</label><label class="dateCell"> ' + taskObj.date + '</label></div>'
                    + '<div class="divCell assignedCell">' + taskObj.assigned + '</div>'
                    + '</div>';
            return tRow;
        });
        console.log("Page Action : ", this.pageAction);
        if(this.pageAction === "PAGELOAD"){
            $('.divTable').append(taskRows);
        }else{
            $('.divTable').prepend(taskRows);
        }
        this.clearForm();
    },
    clearForm:function(){
        $(".taskName").val("").focus();
        $(".taskDate").val("");
        $(".taskAssigned").val("");
    }
}


const taskNamespace = (function() {
    let pageAction  = "PAGE_LOAD";  
    let defaultTasks = [
        {"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
        {"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
        {"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
        {"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
        {"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
        {"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
        {"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
    ];

    return {
        appendTask(tasks){
            let taskRows = tasks.map((taskObj, i) => {
            let tRow = '<div class="divRow">'
                        + '<div class="divCell"><label class="nameCell">'+ taskObj.name + '</label><label class="dateCell"> ' + taskObj.date + '</label></div>'
                        + '<div class="divCell assignedCell">' + taskObj.assigned + '</div>'
                        + '</div>';
                return tRow;
            });
            console.log("Page Action : ", this.pageAction);
            if(this.pageAction === "PAGELOAD"){
                $('.divTable').append(taskRows);
            }else{
                $('.divTable').prepend(taskRows);
            }
            this.clearForm();
        }
    };
})();

$(document).ready(function(){
    // When page is ready load tasks array 
    taskNamespace.appendTask(taskNamespace.defaultTasks);

    // User Events
    $(".formButton").on("click", function(){
            taskNamespace.pageAction = "SUBMIT";
            let taskObject = {};
            let tasks = [];
            taskObject.name     = $(".taskName").val() || "";
            taskObject.date     = $(".taskDate").val() || "";
            taskObject.assigned = $(".taskAssigned").val() || "";
            if(taskObject.name !== ""){
                tasks.push(taskObject);
                taskNamespace.appendTask(tasks);
            }
        }
    );
});
