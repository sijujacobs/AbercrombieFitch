var taskTracker = (function() { 
    var pageAction = "PAGE_LOAD";
    var defaultTasks = [
        {"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
        {"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
        {"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
        {"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
        {"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
        {"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
        {"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
    ];
    var onPageLoad = function () { 
        appendTasks(defaultTasks, pageAction);
    }; 

    /**
     * Here we create a new object and add properties to that object from the View
     * This new object then pushed to an array collection
     * Call the appendTask function and pass this array and pageAction as parameteres 
     */
    var onSubmitClick = function () { 
        pageAction          = "SUBMIT";
        var taskObject      = {};
        var tasks           = [];
        taskObject.name     = $(".taskName").val() || "";
        taskObject.date     = $(".taskDate").val() || "";
        taskObject.assigned = $(".taskAssigned").val() || "";
        if(isValidForm(taskObject)){
            tasks.push(taskObject);
            appendTasks(tasks, pageAction);
        }
    };

    var isValidForm = function (taskObject) { 
        var isValid = false;
        var invalidField = "";
        for(val in taskObject){
            var thisValue = taskObject[val];
            if(thisValue === undefined || thisValue === "" || thisValue === null){
                isValid = false;
                invalidField = val;
                $('.formErrorLabel').text("Please enter TASK " + invalidField.toUpperCase());
                break;
            }else{
                isValid = true;
                $('.formErrorLabel').text("");
            }
        }
        return isValid;
    }

    /**
     * Here we clear the view after appending rows, this function called after appendTasks()
     * Format date and display today's date as default
     */
    var clearForm = function() { 
        $(".taskName").val("").focus();
        //$(".taskDate").val("");
        $(".taskAssigned").val("");
        var today               = new Date();
        var currentMonth        = today.getMonth() + 1;
        currentMonth            = (currentMonth.toString().length === 1)? "0" + currentMonth : currentMonth;
        var currentDate         = (today.getDate().toString().length === 1)? "0" + today.getDate() : today.getDate();
        var currentDateString   = currentMonth + "/" + currentDate+ "/" + (today.getFullYear());
        $(".taskDate").val(currentDateString);
    } 

    /**
     * Dynamically append rows to the table based on the arraycollection and the page action
     * @param {tasks} array The JSON obect, which is an array collection of objects .
     * @param {pageAction} string Append/Prepend rows based on this parameter.
     */
    var appendTasks = function(tasks, pageAction){
        //console.log('taskTracker :: appendTasks : pageAction = ' + pageAction); 
        var taskRows = tasks.map(function(taskObj) {
            var tRow = '<div class="divRow">'
                    + '<div class="divCell"><label class="nameCell">'+ taskObj.name + '</label><label class="dateCell"> ' + taskObj.date + '</label></div>'
                    + '<div class="divCell assignedCell">' + taskObj.assigned + '</div>'
                    + '</div>';
            return tRow;
        });
        (pageAction === "SUBMIT") ? $('.divTable').prepend(taskRows) : $('.divTable').append(taskRows);
        clearForm(); 
    };
    
    return { 
        onPageLoad: onPageLoad, 
        onSubmitClick: onSubmitClick 
    }; 
})();

/**
 * When DOM is ready call appendTasks() and fill Table with local JSON data
 * Register click event and call respective function when user click SUBMIT button 
 */
$(document).ready(function(){
    // When page is ready load tasks array 
   taskTracker.onPageLoad();
    // User Events
    $(".formButton").on("click", function(){
        taskTracker.onSubmitClick();
    });
});

    