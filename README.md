## John Riley's Professional Portfolio

This repository houses the code for my professional portfolio website, [johnriley.dev](https://johnriley.dev/), showcasing various components such as certifications, proficiency word clouds, professional experience bar charts, and public speaking engagements grid. 

The inspiration of this project was created from a meetup idea from the community at the [Free Code Camp Columbus](https://fcccolumbus.com/) special interest group, and from the need to convert my existing similar portfolio at Tableau (which is no longer a free platform)

### Technologies Used

#### D3.js for Data Visualization

[D3.js](https://d3js.org/) (Data-Driven Documents) is a JavaScript library for manipulating documents based on data. It's commonly used for creating interactive and dynamic data visualizations in web browsers. In this portfolio:

- **Certification Pie Chart**: D3.js is utilized to create a pie chart visualizing the distribution of certifications. Each slice of the pie represents a certification, and its size is proportional to the percentage of total certifications.

- **Professional Experience Bar Chart**: D3.js is employed to generate a horizontal bar chart displaying professional experience. Each bar represents a company, with the x-axis indicating the years and the y-axis representing the company names. The width of each bar corresponds to the duration of employment.

#### WordCloud.js for Proficiency Word Cloud

[WordCloud.js](https://github.com/jasondavies/d3-cloud) is a JavaScript library based on D3.js for generating word clouds. It takes a list of words and their frequencies as input and produces a visually appealing word cloud. In this portfolio:

- **Proficiency Word Cloud**: WordCloud.js is used to create a word cloud representing skills and proficiencies. Each term in the word cloud corresponds to a skill, and its size reflects the proficiency level.

### Professional Experience

#### Sample Data Structure

```javascript
const experienceData = [
    { company: "Company A", startYear: 2010, endYear: 2015, position: "Position A", duties: "Duties A" },
    { company: "Company B", startYear: 2015, endYear: 2020, position: "Position B", duties: "Duties B" },
    // Add more entries as needed
];
```

The professional experience section employs JavaScript and D3.js to dynamically generate a bar chart based on the provided data structure. It visualizes work experience with bars representing companies, x-axis indicating years, and y-axis displaying company names.

### Public Speaking Engagements

The public speaking engagements grid displays a scrollable grid of speaking engagements, including the date, location, title, and venue. The layout is designed to be responsive, adjusting the number of engagements displayed per row based on the viewport width.

### Installation and Usage

To run the portfolio locally, clone the repository and open the `index.html` file in a web browser.

```bash
git clone https://github.com/your-username/professional-portfolio.git
```

Feel free to explore the code and customize it according to your needs.

### License

This project is licensed under the [CC0 1.0 Universal License](LICENSE).

### Dev Log

#### 2023-03-20 
- Finished the intial version for demoing purposes at Free Code Camp Columbus

#### 2023-03-16
- registered johnriley.dev
- creted this repo
- createrd a skeleton index.html from GPT
- configured GitHub pages to automatically deploy changes to https://readysetagile.github.io/john-riley-dev/

