var mugTooltip = "Hello! I'm John Riley. Here's my story.  I have over 30 years of professional experience for you to explore. Navigate, hover, and click to see extended details.  You can always export the (boring) PDF copy if necessary";

// Define an array of certifications with their titles and image paths
var certifications = [
    { title: "Professional Scrum Trainer", image: "PST.svg" },
    { title: "Certification 2", image: "cert2.png" },
    { title: "Certification 3", image: "cert3.png" },
];

// Get the certifications list element
var certificationsList = document.getElementById("certificationsList");

// Set tooltip text dynamically using JavaScript
document.getElementById("profileImage").title = mugTooltip;

// Populate the certifications list dynamically
certifications.forEach(function(certification) {
    // Create list item
    var listItem = document.createElement("li");
    listItem.classList.add("flex", "items-center", "mb-2");

    // Create image element
    var image = document.createElement("img");
    image.src = certification.image;
    image.alt = certification.title;
    image.classList.add("w-8", "h-8", "mr-2");

    // Create title element
    var title = document.createElement("span");
    title.textContent = certification.title;

    // Append image and title to list item
    listItem.appendChild(image);
    listItem.appendChild(title);

    // Append list item to certifications list
    certificationsList.appendChild(listItem);
});
