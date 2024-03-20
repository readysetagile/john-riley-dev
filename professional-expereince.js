const reversedExperienceData = [
    {
      company: "Ready Set Agile, LLC:",
      startYear: 2017,
      duties: "• Created and delivered customized foundation Agile training solutions for corporations using the Training From The Back of The Room (TFTBOTR) style<br>• Coached associates with agile software delivery techniques in all agile roles",
      //endYear: 0,
      position: "Principal Agile Coach & Trainer"
    },
    {
      company: "Safelite Auto Glass",
      startYear: 2016,
      duties: "• Scrum master on teams of approximately 40 members including a Software Engineering Lead and the QA Practice Manager responsible for contact center, claims management, and field supply products <br>• Started new team efforts of capital funded products including an RV Solutions and central buyouts products <br>• Assisted in the creation and delivery of the practice’s agile maturity model <br>• Coached PMO and portfolio management teams on scaled agile product development <br>• Assisting with efforts to create the organization’s agile training material <br>• Coached team members on latest agile techniques using community engagement, blogs, books and video <br>• Delivered a two-day agile foundations course to new agile teams in 16 sessions (approx.. 200 members) <br>• Mentoring associates interested in transitioning to the Scrum Master and Product Owner roles <br>• Assisted in financial tracking of capital funded projects for the team",
      endYear: 2017,
      position: "Scrum Master"
    },
    {
      company: "American Electric Power",
      startYear: 2013,
      duties: "• Scrum Master on the company’s largest agile team. <br>• Facilitated scrum events, removed impediments, and serviced the organization <br>• Provided periodic sponsor updates for $500K+ projects <br>• Provided input to management to restructure team organization <br>• Created a working group for advanced agile practices including ATDD and automated",
      endYear: 2016,
      position: "Consultant"
    },
    {
      company: "Huntington National Bank",
      startYear: 2012,
      duties: "• Led scrum events during several sprints for a business online website team.   <br>• Upheld the scrum framework to advise Product Owners to deliver quality software after every sprint. <br>• Improved developer efficiency by introducing core development practices to a team of 6 developers and 4 testers. <br>• Reported project financial information to managers, vice presidents and other stakeholders <br>• Created methods for better release planning for product owners and the business analyst with tools such as story board mapping.",
      endYear: 2013,
      position: "Consultant"
    },
    {
      company: "Cardinal Solutions Group",
      startYear: 2012,
      duties: "Team leader bridging the technology gap in the Project Services practice. Also responsible for leading the effort to define Cardinal’s best software development practices and methodologies, and owner of training classes in advanced agile practices including Acceptance Test Driven Development (ATDD).",
      endYear: 2016,
      position: "Agile Coach"
    },
    {
      company: "Emerson Network Power",
      startYear: 2006,
      duties: "• Advised technical practices to an Engineering team of 3 thermal engineers and 3 developers <br>• Led the effort to use Lean six-sigma principles to improve shop floor activities <br>• Automated a small-part inventory system <br>• Architected a real-time air-conditioning simulator to compute performance using given environment conditions <br>• Introduced eCommerce department to Agile software development methodologies.  Led the effort to facilitate the adoption of scrum events. <br>• Architected the company’s eCommerce security model",
      endYear: 2012,
      position: "Principle Architect"
    },
    {
      company: "Healthcare Logistics Solutions",
      startYear: 2004,
      duties: "• Responsible for all technical automation (architecture, design, and development) for the company. <br>• Implemented a company-wide iterative, team-focused software development methodology for the company.  <br>• Re-designed and developed the company’s web site  • Provided technical mentoring for all other developers. <br>• Designed and developed a shipping transaction import and reporting tool to consume daily shipping transactions, import into a database, and provide reporting services for internal users. The tool also used geocoding to match textual address information with company records. <br>• Designed and developed a custom report requesting system<br>• Designed and developed a new hospital setup wizard on the company website. The wizard would take user information, send that information to internal machines using web services, and setup third-part shipping information to provide instantaneous shipping account setup for hospitals. <br>• Automated company accounting system to generate weekly billing reports to all customers, email each report, and save receipt status to data stores. <br>• Provided general systems administration.",
      endYear: 2006,
      position: "Senior Technical Advisor"
    },
    {
      company: "Greenlawn Mobile Home Sales",
      startYear: 2003,
      duties: "• Created the backend of the company’s website to support dynamic content of homes for sale and other static pages. <br>• Built the hardware and software portion of the company’s servers and provided general system administration.",
      endYear: 2004,
      position: "Independent Consultant"
    },
    {
      company: "Mapics, Inc.",
      startYear: 1999,
      duties: "• Software architect for an application development toolset built on the Microsoft .NET platform.  This toolset was used to build the flagship product for the former Frontstep, Inc <br>• Advised development teams of 4-10 members each of best technical practices. <br>• Delivered multiple keynote addresses for national user conference <br>• Re-designed several manufacturing software configuration bolt-on components for the existing ERP framework. <br>• Provided expert advice to give users the ability to dynamically create accounting and shop floor forms for flagship ERP system. <br>• Led the effort to introduce automated software builds and deployment using multiple technologies. <br>• Introduced Extreme Programming (XP) concepts to teams. <br>• Automated methods for documentation department to incorporate technical documentation into shipped software <br>• Architected approach to automatically deploy software updates for flagship product to customers worldwide.",
      endYear: 2003,
      position: "Senior Software Architect"
    },
    {
      company: "TDCI Consulting, Inc.",
      startYear: 1996,
      duties: "• Facilitated the efforts for the company’s software development methodology  <br>• Advised a Fortune 500 manufacturing company to implement simpler shop floor manufacturing processes <br>• Delivered keynote address to national user conference of a software manufacturing company <br>• Developed the framework and implemented an internal web-based time tracking and recording solution <br>• Created J2EE and JAVA Servlets and a SQL Server database. Also developed several management reports produced from the data captured in the database. Management, consultants and clients use the system. <br>• Lead Developer on a project to rewrite a multi-platform claims system for a major local insurance company.  <br>• Lead Developer for a Fortune 500 Manufacturing Software Vendor responsible for developing a wizard for a third party object-oriented configuration tool.",
      endYear: 1999,
      position: "Senior Software Specialist"
    },
    {
      company: "Ultryx Corporation",
      startYear: 1992,
      duties: "• Part of a team that developed an object-oriented SDK",
      endYear: 1996,
      position: "Applications Developer"
    }
  ]
  
// i messed up and got lazy.  reverse the order of the array so that the last job I worked is at the bottom
const experienceData = reversedExperienceData.reverse();

//get the tooltip element from the page
var tooltipElement = document.getElementById('experience-tooltip');

// Function to create the bar chart
function createBarChart(data) {
    const margin = { top: 20, right: 30, bottom: 30, left: 150 };
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    // Create SVG element
    const svg = d3.select("#experience-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Create scales
    const x = d3.scaleLinear()
      //.domain([d3.min(data, d => d.startYear), d3.max(data, d => d.endYear)])
      //.domain([d3.max(data, d => d.endYear), d3.min(data, d => d.startYear)])
      .domain([2024, d3.min(data, d => d.startYear) - 1])
      .range([0, width]);
  
    const y = d3.scaleBand()
      .domain(data.map(d => d.company))
      .range([height, 0])
      .padding(0.1);
  
    // Create x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format("d"))
        //.tickValues(d3.range(d3.max(data, d => d.endYear), d3.min(data, d => d.startYear) - 1, -2)) // Label every 2 years in reverse order
        .tickValues(d3.range(2024, d3.min(data, d => d.startYear -1 ), -5)) // Label every 2 years in reverse order
        .tickPadding(10) // Add padding between ticks and axis
    );

    // Create y-axis
    const yAxis = svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("text-anchor", "end") // Adjust text-anchor to end for right-justification
      .attr("dx", "-.8em")
      .attr("dy", ".15em");
  
    // Create y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      //.text("Company");
  
      
    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.endYear))
      .attr("y", d => y(d.company))
      .attr("width", d => x(d.startYear) - x(d.endYear ? d.endYear : new Date().getFullYear()))  // no endYear = present
      .attr("height", y.bandwidth())
      .attr("fill", "steelblue")
      // Add tooltip on mouseover
      .on("mouseover", function(event, d) {
        //set the tooltip text
        const ttText = '<b>' + d.company + '</b>&nbsp;[' + d.position + '] : ' + d.startYear + '-' + (d.endYear ? d.endYear : "") + '<br>' + d.duties;

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

    // Remove label for the position
    svg.selectAll(".bar-label").remove();
  }
          
  
  // Call the function with sample data
  createBarChart(experienceData);
  