//head svg in the pie chart
var headSVG = '<?xml version="1.0" encoding="utf-8"?>' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1541.793 1690.849" enable-background="new 0 0 1541.793 1690.849" xml:space="preserve">' +
    '<g id="Man_Head_Silhouette">' +
    '<g>' +
    '<path fill="#231F20" d="M1099.775,573.783c-1.887,58.303-22.203,114.508-58.031,160.543 c-36.128,49.074-56.751,78.051-61.869,86.933c-25.189,48.748-37.177,103.241-34.773,158.06v2.032H696.723v-1.355 c1.811-55.003-10.882-109.515-36.805-158.06c-18.508-29.994-38.556-59.01-60.063-86.933 c-35.828-46.035-56.144-102.24-58.031-160.543c-0.818-72.82,29.008-142.632,82.191-192.381 c109.005-107.039,283.661-107.039,392.665,0C1070.022,431.51,1100.169,501.06,1099.775,573.783z M1004.939,730.488l11.516-15.58 c78.561-93.808,67.407-233.279-25.064-313.41c-94.468-92.96-246.038-92.96-340.506,0 c-92.471,80.131-103.625,219.601-25.064,313.41l36.805,50.353c9.907,12.527,18.319,26.167,25.064,40.644 c26.35,43.781,40.392,93.864,40.644,144.963h30.934V734.327L697.4,610.588h32.967l60.063,123.738v216.542h61.869V734.327 l60.063-123.738h32.967l-61.869,123.738v216.542h30.934c0.6-51.049,14.617-101.043,40.644-144.963 c14.286-23.974,29.812-47.188,46.515-69.546l2.032-2.032C1003.284,731.768,1003.735,730.488,1004.939,730.488z M729.012,1043.446 v-30.483H914.62v30.483H729.012z M729.012,1105.315v-30.483H914.62v30.935H729.012V1105.315z M759.947,1167.184v-30.483h123.738 v30.935H759.947V1167.184z"/>' +
    '<path fill="none" stroke="#000000" stroke-width="20" stroke-miterlimit="10" d="M813.393,1158.349 c-18.394,110.019,4.971,226.681,65.189,320.576c13.483,21.023,28.911,41.11,48.266,56.894 c24.281,19.8,53.707,32.041,82.793,43.686c41.943,16.793,84.477,33.009,128.968,40.871c44.491,7.862,91.474,6.969,133.446-9.753 c13.778-5.489,27.209-12.882,36.819-24.178c9.61-11.296,14.869-27.064,10.809-41.329l1.137,8 c-19.027-115.433-42.027-229.433-40.027-346.433c1-19,6-38,13-56c2-6,5-11,7-17c5-13,13-24,19-37c1-1,2-2,3-3c3-7,7-13,11-20 c33-53,73-96,97-152c39-87,61-179,65-274c1-27,0-55-2-82s-7-53-13-81c0-1-2-3-2-4c-4-21-11-39-17-59c-2-6-5-11-7-17 c-10-23-20-44-33-66c-7-11-14-20-20-31c-2-3-4-5-6-7c-5-8-11-15-17-22c-1-1-1-3-2-4c-47-56-100-99-163-133c-24-13-48-23-72-34 c-2-1-3,0-5-1c-29-12-57-21-88-28c-1,0-3-2-4-2c-222-52-458-39-638,112c-59,50-103,108-133,177c-23,51-40,105-39,161 c1,9,3,19,5,28c2,8,7,15,8,23c-11,17-22,33-35,50c-41,53-81,98-121,152c-9,13-17,24-25,37c-10,16-18,32-21,51c-1,11,2,22,10,30 c7,7,15,14,24,18s17,10,26,13c14,5,29,4,44,9c11,4,21,14,18,27c-4,16-9,31-14,46c-4,11-13,19-20,30c-4,7-4,16-2,24 c6,16,21,24,34,34c6,5,1,12-2,16c-10,11-23,21-25,36c5,13,16,22,25,32c2,2,3,5,5,7c1,1,1,3,2,4s2,2,3,3c5,10,10,20,9,32 c-1,8-3,15-5,22c-13,38-34,78-21,119c11,23,27,43,50,56c1,1,2,2,3,3c16,9,32,14,49,19c65,2,130,1,195,3c24,0,47,11,62,32 c1,1,2,1,3,2c2,3,4,6,6,9c2,4,4,9,7,13c21,45,32,95,26.498,144"/>' +
    '</g>' +
    '</g>' +
    '</svg>';

// Define personality traits and their corresponding percentages
var personalityTraits = [
    { trait: "Futuristic", percentage: 15, color: "#ff7e67", description: "People exceptionally talented in the Futuristic theme are inspired by the future and what could be. They energize others with their visions of the future. “Wouldn't it be great if ... ” You are the kind of person who loves to peer over the horizon. The future fascinates you."},
    { trait: "Adaptability", percentage: 15, color: "#EDC948", description: "People exceptionally talented in the Adaptability theme prefer to go with the flow. They tend to be now people who take things as they come and discover the future one day at a time. You live in the moment. You don't see the future as a fixed destination. Instead, you see it as a place that you create out of the choices that you make right now."},
    { trait: "Responsiblity", percentage: 20, color: "#76B7B2", description: "People exceptionally talented in the Responsibility theme take psychological ownership of what they say they will do. They are committed to stable values such as honesty and loyalty. Your Responsibility theme forces you to take psychological ownership for anything you commit to, and whether large or small, you feel emotionally bound to follow it through to completion. Your good name depends on it."},
    { trait: "Restorative", percentage: 20, color: "#59A14F", description: "People exceptionally talented in the Restorative theme are adept at dealing with problems. They are good at figuring out what is wrong and resolving it."},
    { trait: "Woo", percentage: 5, color: "#F28E2B", description: "People exceptionally talented in the Woo theme love the challenge of meeting new people and winning them over. They derive satisfaction from breaking the ice and making a connection with someone. Woo stands for winning others over. You enjoy the challenge of meeting new people and getting them to like you. Strangers are rarely intimidating to you."},
    { trait: "Activator", percentage: 25, color: "#6cb2eb", description: "People with the strength of Activator are the ones who make things happen. One of their most recognizable behaviors is the ability to turn thoughts, ideas and concepts into action. In fact, the strength of Activator can be best described or characterized as action. These people are in action, usually an action that you can see – tapping a pen on the table, tapping the screen of their phone, tapping you on the shoulder and asking, “What are you doing? What’s going on?”" }
    // Add more traits as needed
];

// Get SVG container
var svg = document.getElementById("personalityPieChart");

//get the tooltip element from the page
var tooltipElement = document.getElementById('personality-tooltip');

// Set the dimensions and radius of the pie chart
var width = svg.clientWidth / 6;
var height = svg.clientHeight / 6;
var radius = Math.min(width, height) / 2;
var circleCoverArea = 0.75; // percentage of the pie chart that the circle will cover
var headCoverArea = 0.8; // percentage of the circle that the head will cover

// Create a new pie chart layout
var pie = d3.pie()
    .value(function(d) { return d.percentage; })
    .sort(null);

// Define arc generator
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Create SVG group for the pie chart
var g = d3.select("#personalityPieChart")
    .append("g")
    //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); // Center the pie chart in the SVG
    .attr("transform", "translate(50,50)"); // Center the pie chart in the SVG, half of viewport??

// Generate pie chart
var arcs = g.selectAll(".arc")
    .data(pie(personalityTraits))
    .enter().append("g")
    .attr("class", "arc");

// Append path elements for each slice
arcs.append("path")
    .attr("d", arc)
    .attr("fill", function(d) { return d.data.color; })
    // Add tooltip on mouseover
    .on("mouseover", function(event, d) {
        //set the tooltip text
        const ttText = '<b>' + d.data.trait + '</b><br><b>My percentage:</b> ' + d.data.percentage + '%<br><b>Description:</b> ' + d.data.description;

        tooltipElement.innerHTML = ttText;
        // Show tooltip
        tooltipElement.style.display = 'block';

        // Position tooltip relative to mouse pointer
        tooltipElement.style.left = (event.pageX + 10) + 'px'; 
        tooltipElement.style.top = (event.pageY) + 'px'; 
    })

    .on("mouseout", function() {
        // Remove tooltip on mouseout
        tooltipElement.style.display = 'none';
    });

// Append a white circle to cover the inner part of the pie chart
g.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", radius * circleCoverArea) // Set radius to 90% of the pie chart radius
    .attr("fill", "white");

// Append the head SVG inside the white circle
var svgDataUri = "data:image/svg+xml;base64," + btoa(headSVG);
var innerSVG = g.append("svg")
    .attr("x", -radius * circleCoverArea * headCoverArea) // Set x position to the left edge of the circle
    .attr("y", -radius * circleCoverArea * headCoverArea) // Set y position to the top edge of the circle
    .attr("width", radius * circleCoverArea * 2) // Set width to cover the entire circle
    .attr("height", radius * circleCoverArea * 2) // Set height to cover the entire circle
    .html('<image xlink:href="' + svgDataUri + '" width="' + (headCoverArea * 100) + '%" height="' + (headCoverArea * 100) + '%" />');


// Append text labels for each slice
arcs.append("text")
    .attr("transform", function(d) {
        var pos = arc.centroid(d);
        var distance = radius - 1; // Distance from the center of the arc
        var angle = Math.atan2(pos[1], pos[0]);
        var x = pos[0] + distance * Math.cos(angle);
        var y = pos[1] + distance * Math.sin(angle);
        return "translate(" + x + "," + y + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-size", "4px") // Set font size to a small value
    .text(function(d) { return d.data.trait; });
