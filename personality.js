// Define personality traits and their corresponding percentages
var personalityTraits = [
    { trait: "Futuristic", percentage: 50, color: "#ff7e67" },
    { trait: "Woo", percentage: 50, color: "#6cb2eb" }
    // Add more traits as needed
];

// Get SVG container
var svg = document.getElementById("personalityPieChart");

// Set the dimensions and radius of the pie chart
var width = svg.clientWidth / 4;
var height = svg.clientHeight / 4;
var radius = Math.min(width, height) / 2;

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
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); // Center the pie chart in the SVG

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
        var tooltip = d3.select("#personalityPieChart")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("padding", "5px")
            .style("border", "1px solid black")
            .style("border-radius", "5px")
            .style("pointer-events", "none"); // Ensure tooltip doesn't interfere with mouse events
        tooltip.html(d.data.trait); // Set tooltip content

        // Position tooltip relative to mouse pointer
        var x = event.pageX + 10;
        var y = event.pageY + 10;
        tooltip.style("left", x + "px")
               .style("top", y + "px");
    })
    .on("mouseout", function() {
        // Remove tooltip on mouseout
        d3.select(".tooltip").remove();
    });

// Append text labels for each slice
arcs.append("text")
    .attr("transform", function(d) {
        var pos = arc.centroid(d);
        var distance = radius + 10; // Distance from the center of the arc
        var angle = Math.atan2(pos[1], pos[0]);
        var x = pos[0] + distance * Math.cos(angle);
        var y = pos[1] + distance * Math.sin(angle);
        return "translate(" + x + "," + y + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-size", "10px") // Set font size to a small value
    .text(function(d) { return d.data.trait; });
