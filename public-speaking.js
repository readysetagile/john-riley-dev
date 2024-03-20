// Sample data for public speaking engagements
const speakingEngagements = [
    {
      date: "2017-08-10",
      location: "Orlando, FL",
      title: "How ATDD Saved Your Agile Flow",
      venue: "Agile 2017, Agile Alliance"
    },
    {
      date: "2017-07-28",
      location: "Cincinnati, OH",
      title: "Cloud Solution Throwdown!",
      venue: "Cincinnati Day of Agile"
    },
    {
      date: "2017-05-12",
      location: "Indianapolis, IN",
      title: "Automated Testing and ATDD: A Perfect Match",
      venue: "AgileIndy"
    },
    {
      date: "2016-08-24",
      location: "Columbus, OH",
      title: "Agile Games Olympic Style",
      venue: "Agile Leadership Series"
    },
    {
      date: "2016-07-29",
      location: "Cincinnati, OH",
      title: "Automated Testing and ATDD: A Perfect Match,",
      venue: "Cincinnati Day of Agile"
    },
    {
      date: "2016-06-23",
      location: "Cincinnati, OH",
      title: "Automated Testing and ATDD: A Perfect Match",
      venue: "Agile Leadership Series"
    },
    {
      date: "2016-06-16",
      location: "Columbus, OH",
      title: "Automated Testing and ATDD: Best Friends at Work",
      venue: "AEP Agile Conference"
    },
    {
      date: "2015-07-16",
      location: "Columbus, OH",
      title: "Automated Testing and ATDD: A Perfect Match",
      venue: "Agile Leadership Series"
    },
    {
      date: "2015-06-25",
      location: "Columbus, OH",
      title: "Automated Testing and ATDD: Best Friends at Work",
      venue: "AEP Agile Conference"
    },
    {
      date: "2018-10-10",
      location: "Columbus, OH",
      title: "How To Write A Recipe For Automated Testing",
      venue: "Columbus IIBA / Improving"
    },
    {
      date: "2018-08-06",
      location: "Columbus, OH",
      title: "A Bird's-eye View of DevOps",
      venue: "Columbus Idea Foundry"
    },
    {
      date: "2018-06-04",
      location: "Columbus, OH",
      title: "Agile Software Delivery: A Bird's-eye View",
      venue: "Columbus Idea Foundry"
    },
    {
      date: "2018-07-27",
      location: "Cincinnati, OH",
      title: "Scrum Master Interview Games",
      venue: "Cincinnati Day of Agile"
    },
    {
      date: "2019-09-10",
      location: "Columbus, OH",
      title: "Agile Big Room Planning for Jira and Confluence",
      venue: "Atlassian User’s Group"
    },
    {
      date: "2019-05-17",
      location: "Indianapolis, IN",
      title: "How To Write A Recipe For Automated Testing",
      venue: "INBADD (BA Conference)"
    },
    {
      date: "2018-11-13",
      location: "Columbus, OH",
      title: "Automated Testing using Xray Test Management for Jira",
      venue: "Atlassian User’s Group"
    },
    {
      date: "2019-11-07",
      location: "Columbus, OH",
      title: "Big Room Planning Workshop",
      venue: "Business Agility Midwest"
    },
    {
      date: "2019-12-10",
      location: "Columbus, OH",
      title: "Agile: A Bird's-Eye View",
      venue: "Columbus Free Code Camp"
    },
    {
      date: "2020-04-28",
      location: "Columbus, OH",
      title: "Play With Docker Workshop",
      venue: "(Virtual Venue)"
    },
    {
      date: "2020-04-21",
      location: "Columbus, OH",
      title: "How Are We Responding to This Change?",
      venue: "(Virtual Venue)"
    }
  ]

// Make sure the engagements are sorted in reverse order
function compareDates(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Sort in descending order
}
speakingEngagements.sort(compareDates);

// Function to create speaking engagements grid
function createSpeakingEngagementsGrid(engagements) {
    const container = document.getElementById('speaking-engagements');

    engagements.forEach(engagement => {
        const engagementElement = document.createElement('div');
        engagementElement.classList.add('speaking-engagement');
        engagementElement.innerHTML = `
            <p><strong>Date:</strong> ${engagement.date}</p>
            <p><strong>Location:</strong> ${engagement.location}</p>
            <p><strong>Title:</strong> ${engagement.title}</p>
            <p>\t - ${engagement.venue}</p>
        `;
        container.appendChild(engagementElement);
    });
}

// Initial creation of speaking engagements grid
createSpeakingEngagementsGrid(speakingEngagements);

// Function to adjust number of engagements per row based on window width
function adjustEngagementsPerRow() {
    const container = document.getElementById('speaking-engagements');
    const engagements = container.getElementsByClassName('speaking-engagement');

    // Calculate number of engagements per row based on window width
    const windowWidth = window.innerWidth;
    let engagementsPerRow = 4; // Default number of engagements per row
    if (windowWidth <= 768) {
        engagementsPerRow = 2; // Display 2 engagements per row for smaller screens
    } else if (windowWidth <= 1200) {
        engagementsPerRow = 3; // Display 3 engagements per row for medium screens
    }

    // Set width for each engagement based on the number of engagements per row
    const engagementWidth = `calc(100% / ${engagementsPerRow})`;
    for (let i = 0; i < engagements.length; i++) {
        engagements[i].style.width = engagementWidth;
    }
}

// Call adjustEngagementsPerRow initially and whenever the window is resized
adjustEngagementsPerRow();
window.addEventListener('resize', adjustEngagementsPerRow);
