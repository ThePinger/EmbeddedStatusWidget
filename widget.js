// Calling the main function every 3 minutes to refresh the alerts
setInterval(main, 180000);

// The alerts div
var alertPlaceholder = document.getElementById('liveAlertPlaceholder');

function main()
{
    loadJSON('https://widget.instatus.com/issues.json', showAlerts, handleError);
}

// The function responsible for showing the alerts
function showAlerts(data) 
{
    // Check if active incidents exists
    if (data['activeIncidents'])
    {

        console.log(data['activeIncidents'])

        // Loop over all active incidents
        for(var i in data['activeIncidents'])
        {

            var incident = data['activeIncidents'][i];

            console.log(incident);

            // Use the time milliseconds as the ID
            var id = new Date(incident['started']).getTime();

            // If the user closed this alert before it will be available in the local storage and in that case it won't be shown to the user
            if(window.localStorage.getItem(id) === "CLOSED")
                continue;

            // If item is OnScreen check that its actually shown on the screen and not disappeared because of the page refresh
            if(window.localStorage.getItem(id) === "ON_SCREEN" && document.getElementById(id) !== null)
                continue;

            // Create the div wrapper where the alert will get created inside
            var wrapper = document.createElement('div')

            var name = incident['name'];

            // Calculate the time since the incident started
            var started = convertMiliseconds(Date.now() - new Date(incident['started']).getTime())
            if(started['d'] === 0)
                if(started['h'] === 0)
                    if(started['m'] === 0)
                        started = started['s'] + ' seconds ago';
                    else
                        started = started['m'] + ' minutes ago';
                else
                    started = started['h'] + ' hours ago';
            else
                started = started['d'] + ' days ago';

            // Add a color for each incident status
            var status = null;
            if (incident['status'] === 'INVESTIGATING')
                status = '<p style="color:red; float:right"> Investigating</p>';
            else if (incident['status'] === 'IDENTIFIED')
                status = '<p style="color:blue; float:right"> Identified</p>';
            else if (incident['status'] === 'MONITORING')
                status = '<p style="color:aqua; float:right"> Monitoring</p>';
            else
                status = '<p style="color:green; float:right"> Resolved</p>';


            // Add a color for each incident impact
            var impact = '<p style="display:inline;">Impact: </p>';
            if (incident['impact'] === 'OPERATIONAL')
                impact += '<p style="display:inline; color:green"> Operational</p>';
            else if (incident['impact'] === 'UNDERMAINTENANCE')
                impact += '<p style="display:inline; color:black"> Under Maintenance</p>';
            else if (incident['impact'] === 'DEGRADEDPERFORMANCE')
                impact += '<p style="display:inline; color:yellow"> Degraded Performance</p>';
            else if (incident['impact'] === 'PARTIALOUTAGE')
                impact += '<p style="display:inline; color:yellow"> Partial Outage</p>';
            else if (incident['impact'] === 'MINOROUTAGE')
                impact += '<p style="display:inline; color:orange"> Minor Outage</p>';
            else
                impact += '<p style="display:inline; color:red"> Major Outage</p>';

            // For the incidents it would be shown in yellow alert box
            wrapper.innerHTML = '<div id="div' + id + '" class="alert alert-warning alert-dismissible" role="alert">' + '<h4 style="float:left">' + name + '</h4>' + status + '<br><br>' + impact + '<h6 >Started ' + started + '</h6>' + '<button id="' + id + '" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

            alertPlaceholder.append(wrapper)

            // Add an event listner to the button so when the close button is clicked it gets triggered and calls the handleCloseButton function
            var closeAlertButton = document.getElementById(id);
            console.log(closeAlertButton);
            closeAlertButton.addEventListener("click", handleCloseButton, false);
            window.localStorage.setItem(id, "ON_SCREEN")
        }
    }

    // Check if active maintenances exists
    if (data['activeMaintenances'])
    {

        console.log(data['activeMaintenances'])

        // Loop over all active maintenances
        for(var i in data['activeMaintenances'])
        {

            var maintenance = data['activeMaintenances'][i];

            console.log(maintenance);

            // Use the time milliseconds as the ID
            var id = new Date(maintenance['start']).getTime();

            // If the user closed this alert before it will be available in the local storage and in that case it won't be shown to the user
            if(window.localStorage.getItem(id) === "CLOSED")
                continue;

            // If item is OnScreen check that its actually shown on the screen and not disappeared because of the page refresh
            if(window.localStorage.getItem(id) === "ON_SCREEN" && document.getElementById(id) !== null)
                continue;

            // Create the div wrapper where the alert will get created inside
            var wrapper = document.createElement('div')

            var name = maintenance['name'];

            // Convert minutes to milliseconds
            var duration = parseInt(maintenance['duration']) * 60000;

            // Calculate the maintenance start
            var start =  new Date(maintenance['start']).getTime();
            // Calculate the maintenance end
            var end = start + duration;

            start = new Date(start).toLocaleString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            end = new Date(end).toLocaleString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });

            // Add a color for each maintenance status
            var status = null;
            if (maintenance['status'] === 'NOTSTARTEDYET')
                status = '<p style="color:red; float:right"> Not Started Yet</p>';
            else if (maintenance['status'] === 'INPROGRESS')
                status = '<p style="color:blue; float:right"> In Progress</p>';
            else
                status = '<p style="color:green; float:right"> Completed</p>';

            // For the maintenances it would be shown in yellow alert box
            wrapper.innerHTML = '<div id="div' + id + '" class="alert alert-primary alert-dismissible" role="alert">' + '<h4 style="float:left">' + name + '</h4>' + status + '<br><br>' + '<h6 >From ' + start + ' to ' + end +  '</h6>' + '<button id="' + id + '" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

            alertPlaceholder.append(wrapper)

            // Add an event listner to the button so when the close button is clicked it gets triggered and calls the handleCloseButton function
            var closeAlertButton = document.getElementById(id);
            console.log(closeAlertButton);
            closeAlertButton.addEventListener("click", handleCloseButton, false);
            window.localStorage.setItem(id, "ON_SCREEN")
        }
    }
}

function handleError(xhr)
{
    console.error(xhr);
}

// This function aims to handle the close button event by adding the incident id to the local storage 
// so in case it gets fetched again it won't appear to the user. In addition it hides the alert from the display
function handleCloseButton(event)
{
    var id = event.target.id;
    document.getElementById('div' + id).style.display = 'none';
    window.localStorage.setItem(id, "CLOSED")
}

//------------------------------------------------------------------HELPERS---------------------------------------------------------------

// This function main purpose is sending an http GET Request to a specific path and returning the JSON Response
function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

// A helper function for converting the milliseconds to days, hours, minutes, seconds
// https://gist.github.com/flangofas/714f401b63a1c3d84aaa
function convertMiliseconds(miliseconds, format) 
{
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
  
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);
    
    switch(format) 
    {
        case 's':
            return total_seconds;
        case 'm':
            return total_minutes;
        case 'h':
            return total_hours;
        case 'd':
            return days;
        default:
            return { d: days, h: hours, m: minutes, s: seconds };
    }
}
