var proficiencies = [
    { category: "Roles", description: "Tester", justification: "I am a tester first before I am a developer. However, I did not start out my career as a tester. I started out as a developer. I am now a tester first because I am purpose driven by principle. I always ask the question ‘why’ first. That is why my development times have been reduced dramatically.", proficiency: 9 },
    { category: "Roles", description: "Software Architect", justification: "My strong skills in software development allowed me to evolve into a software architect. A lot of what I do is principle driven, and a successful software architect must adhere to a set of fundamental principles in order to architect software with strong design goals in mind (like maintainability, security, performance, etc.). I loved when I was a software architect, and I will always hold on to the strong principles that are needed to be a successful software architect in all technical challenges that face me.", proficiency: 6 },
    { category: "Roles", description: "Scrum Master", justification: "A scrum master is an agile coach - period. I have been refining my skills as a scrum master for over a decade. A scrum master is also the most misunderstood role, even though it is clearly defined in The Scrum Guide. The term ‘agile coach’ has been bastardized by an industry that does not understand the Scrum Master role. The scrum master role can be summarized in one word - teacher. A good teacher is also a good learner, and I am good at both.", proficiency: 8 },
    { category: "Roles", description: "Product Owner", justification: "Being a product owner comes naturally to me. Over the last few years I have developed my skills as a product owner just by being the CEO of a company. I can easily identify value, and then map net value stream. I also can establish pull and continuously improve to pursue perfection. However, creating flow is challenging, as anyone who has been in the product owner role knows. I always feel that I can improve to establish flow in any product owner situation.", proficiency: 7 },
    { category: "Roles", description: "Mentor", justification: "I feel that I have enough years in the industry to call myself a good mentor. A good mentor leads by example, and I can use the stories in my life as examples of where I have succeeded and where I have failed. People in a learning situation appreciate this experience. So I feel that my mentorship is very strong.", proficiency: 8 },
    { category: "Roles", description: "Facilitator", justification: "I am a facilitator before I am an instructor. I don’t go to the front of the room and tell my audience what is what. However, I will try to encourage a group of people to collaborate around a problem. The magic happens when you watch from the back of the room.", proficiency: 5 },
    { category: "Roles", description: "Developer", justification: "I started out my career as a developer. I love solving problems! I had a passion as a technical developer for a very long time. I loved solving problems, sitting back, and watching the solution work. However, I lost the passion as a true developer over the years, and I developed more of a passion for collaboration with small teams, and to be a teacher. I can now give the experience that I learned over the years to those who are willing to receive it and do what I did early in my career.", proficiency: 8 },
    { category: "Roles", description: "Business Analyst", justification: "Yes, I have experience as a business analyst. A business analyst is a very important role. As a business analyst, you need to speak several languages, and I mean that you have to understand several different jargons in order to be a successful business analyst. You also need to be able to separate the ‘what’ from the ‘how’ with business problems. I feel that business analyst is a great way to start out in a field that you do not understand (like IT), and you can go in any career direction as a business analyst.", proficiency: 5 },
    { category: "Roles", description: "Agile Coach", justification: "If you read my description of a scrum master then you will know that I have an animosity towards the term agile coach. I only put it here because I feel that my coaching skills are a direct result of my teaching skills, and a reason why I am at the middle of the road as an agile coach is because I can always learn to become a better teacher, and a better learner.", proficiency: 5 },
    { category: "Programming Language", description: "Ruby", justification: "Ruby is awesome! It’s easy to learn, however, the learning curve can be deep for those who come from the C#/Java world. Installing gems is a breeze. It plugs into IDE’s nicely. However, syntactically, you can do the same thing in Ruby about 10 ways, which might make it difficult to maintain existing code (without good standards). It does port well, and you can compile your solution to native code on popular platforms. Ruby is the language that I will use in an automated testing solution because the Ruby/Cucumber structure works well with the text parsers. Ruby is a huge platform, though. I don’t think I will ever grasp it conceptually, or even the things that you can accomplish in it. So, my proficiency stays at a 5.", proficiency: 5 },
    { category: "Programming Language", description: "Python", justification: "Python has really taken off as the go-to for a simple OO platform with a healthy support community. For me, however, I just haven't used it that often lately. However, when I start tinkering with Raspberry PI integrations again, I will use Python, but probably for no other reason.", proficiency: 3 },
    { category: "Programming Language", description: "PHP", justification: "It seems that all the plugins for my website are written in PHP. It’s a wonderful platform, but I will never get past the maintenance stage for PHP. Not sure why. I guess I picked up other languages in its place.", proficiency: 3 },
    { category: "Programming Language", description: "JavaScript", justification: "Javascript is the language I use when I need coding for the web. It’s quick and straightforward, extensible, easy to pick up. However, to me, JS will never be that language that I can use for OO, security, and above all, maintainability. JS can get ugly really quickly. Therefore, I consider my proficiency at a 6, and I have no plans to get that any higher", proficiency: 6 },
    { category: "Programming Language", description: "Java", justification: "Java is a great language. I started using it when Sun Microsystems first released it, and I was hooked immediately. I saw how much you could expand the language, and I was attracted to the portability between Unix and MS systems, and also the concept of spinning up VMs. Then people stated developing their own libraries, and then more libraries, and even more. The number of ways to expand the components got out of control. Then the security problems arose. So I concentrated my efforts on other technologies, which is why my proficiency is a 4. I would pick it up again, but not as involved as I was before.", proficiency: 4 },
    { category: "Programming Language", description: "C++", justification: "I used C++ when it first was first released. It’s the language that I learned how to program in OO. I even used the predecessors: C+, and even straight C. However, it’s cryptic, and I think I will only use it again if I have to maintain some code.", proficiency: 3 },
    { category: "Programming Language", description: "C#", justification: "C# has everything. MS stole the syntax of Java, took everything Java lacked, and packaged it in their own IDE (Visual Studio). C# is the main language I will pick for any back-end system. MS even introduced items like Lambda expressions into the language to shorten coding cycles. I am, by far, the most fluent in C#, and I still use it in Azure DevOps and VS Community Ed.", proficiency: 8 },
    { category: "Principles", description: "Think Big", justification: "The activator personality trait is the largest part of my personality. This is why I am skilled at thinking big. Even when I have my head down deep in a problem, I need to look up at the big picture. I always need to think of the bigger problem, and make sure that the detail that I am working on is part of the big picture.", proficiency: 7 },
    { category: "Principles", description: "Test-first", justification: "My “test-first mindset” came from my experimentation principle. In fact, I can’t go back to the development-first mindset. When a business presents a problem to me, my first thought is, how can I test that? Before that, I immediately went into problem-solving mode and started coding – which is where most people with my personality go. However, I save a lot more time thinking about the problem first, and there is a lot less development time needed when a test-first mindset is developed.", proficiency: 8 },
    { category: "Principles", description: "Start Small", justification: "Like many people, I try to “bite off more than I can chew”. However, a good friend once told me, “Don't boil the ocean”. That is great advice and I have to continually remind myself to do my work in small chunks. Whatever I do, and whatever feedback I receive, it has to be valuable, even in small chunks. If people don't see the value in the small thing you did, you will never be able to realize your big picture. It is only after that when you can do the next big thing – in small chunks of course!", proficiency: 5 },
    { category: "Principles", description: "Self organizing", justification: "I will favor a self-organizing team over a team that has been victimized by command-control. A self-organizing team that works with a solution every day should tell the larger organization how to solve the problem. However, the larger organization should continually remind the self-organizing team the vision, mission, and strategy of the problem that they are solving. I do a lot of studying in this area and I feel that my need to improve will continue over the next few years.", proficiency: 6 },
    { category: "Principles", description: "Scale Organically", justification: "In order to do the next great thing you have to scale. However, you cannot scale too fast or your infrastructure will suffer. Also, you cannot scale too slowly or everyone else will capitalize on your ideas. That's why you have to scale and grow according to your surroundings. I feel that I always need to improve in this area, so that is why I am in the middle of the road here.", proficiency: 5 },
    { category: "Principles", description: "Purpose driven", justification: "I have learned to ask one important question over the years – “Why?”. It is part of why I believe in the concept of self-organizing teams. Any team that does not have the safety to ask ‘why’ cannot function successfully as a team. Asking ‘why’ will drive our purpose for anything, and that is why I feel I am very strong in this area.", proficiency: 8 },
    { category: "Principles", description: "Psychological Safety", justification: "“Make safety a pre-requisite”. This has been one of my requirements for development. I would like to think that I am an expert in this principle, however I know I need to continue to work in this area continuously. When forming teams I make sure everyone is aware that psychological safety is a must.", proficiency: 6 },
    { category: "Principles", description: "Learn Rapidly", justification: "Learning rapidly is a direct result of my skill with experimentation. I get feedback from everything – from verbal and non-verbal communication, my environment, and even from and error in a program. Feedback is everywhere! You just have to take a moment and look listen, feel, etc., and that is how we learn is from the feedback that we receive from our environment.", proficiency: 9 },
    { category: "Principles", description: "Game Theory", justification: "How often do you see game theory on a resume? I'm sure not often, however, I happen to be pretty experienced with game theory. There are a lot of elements of game theory that are used on agile teams: Players, interactions, and outcomes are examples; also involved are decisions, strategy and evolution. Many of these concepts (when used properly) are signs that an agile organization is thriving.", proficiency: 7 },
    { category: "Principles", description: "Experimentation", justification: "I am not afraid to fail. The reason why I am not afraid to fail is because I learn from all my failures. I am successful in business, technical challenges, and life in general because of my skill with experimentation. I will always experiment where I can...So be ready world!", proficiency: 9 },
    { category: "Principles", description: "Empiricism", justification: "Empiricism Is where knowledge comes from experience and decisions are made based on what is known. This means that knowledge is favored over predictions. I realized over the years that my ability to predict was not as successful as my ability to apply my knowledge. So I will usually rely on what I have learned over what I can predict in any decision making task.", proficiency: 8 },
    { category: "Principles", description: "Collaborate", justification: "My ability to collaborate has gotten better over the years. As a problem solver I always had the answer. However, as I gained more experience, I was able to realize that any problem can be seen from several different perspectives. It is for this reason that I collaborate to apply a solution, and I try to get small teams to understand this skill.", proficiency: 9 },
    { category: "Cloud Tech", description: "Virtual Machines", justification: "In a former life I used VMs everywhere I could. Before “cloud computing” was a thing, I would build my own physical machines that could power a small city, and then experiment with ways to divide the resources into virtual machines to serve my purposes. Then container computing became a thing, and since then, I have let the cloud computing “world” run the experiments. I can see ways to combine VMs and containers that might serve the purposes, though.", proficiency: 8 },
    { category: "Cloud Tech", description: "Selenium", justification: "Any time I need to automatically test web components, I will use Selenium. I feel that I can use it in most IDEs and code around 85-90% of finding and interacting with the web’s components.", proficiency: 8 },
    { category: "Cloud Tech", description: "Maven", justification: "Gradle, maven, Node, Bower, grunt, etc. Great tools for package and package dependency management. These tools are used in my presentation platform. However, I am just a user. I won't be creating any extensive components using these tools soon. Maybe just some small ones, but that’s it.", proficiency: 2 },
    { category: "Cloud Tech", description: "Jenkins", justification: "I will use Jenkins for CI/CD in a Unix environment every time. There is so much you can do in that arena alone. I even recently discovered a way to have Jenkins dynamically spin up a Docker container, run a suite of automated acceptance tests, suck those results into Jira, and take the container down. It’s the perfect testing solution, and Jenkins is a great tool to do it. I would not consider myself to be a Jenkins admin, though, and I am not familiar with a fraction of its capabilities. So that is why my proficiency is so low.", proficiency: 4 },
    { category: "Cloud Tech", description: "Git", justification: "I came from the SourceSafe world (year, old) which evolved into TFS (thankfully). So, I have been around version control for a while, however, git was never in the toolkit until recently. Now it seems that everywhere you look for version control and building packages and CI/CD, you NEED git experience. In fact, any agile development team should have git knowledge as a prereq. All of my code is in gitHub repositories now, and just about everyone I know is using git in some form to manage code. I am not the guy who will be able to help you, for example, get out of a git branch-hell situation. My advice it to start over.", proficiency: 6 },
    { category: "Cloud Tech", description: "Docker", justification: "Containers are where its at for DevOps, period. I use container technology just about every day now. My slow laptop can run some of the most resource intensive software in my docker host. Also, for a dual OS machine, Docker is the way to go. My Windows 10 laptop runs a Unix environment without a hitch. I will use containers continually, and my proficiency will get higher on this.", proficiency: 7 },
    { category: "Cloud Tech", description: "Continuous Integration/Continuous Deployment", justification: "CI/CD is the only way to do development. I use Jenkins as my CI/CD server for my builds. The version control tool is git, and we use branches, pull requests, and even Jenkinsfile scripts that are stored in the repository. The deployments are made to a Docker container on a remote server. So my proficiency will go up as I understand the concepts of the deployment methodology that we are using more and more.", proficiency: 6 },
    { category: "Cloud Tech", description: "Agile Project Management Tools", justification: "I know what all the cool kids are using, but it's difficult to choose the right agile project management tool. The only way you can know if it is going to work is if you have a team and see how it works. My proficiency is low because I am a perpetual learner. I am not an expert, and I still have a long way to go. I am still figuring out the complexities of these tools, and I can’t see me stopping using these tools any time soon.", proficiency: 4 },
    { category: "Cloud Tech", description: "Azure DevOps", justification: "I love Azure DevOps! It’s a one-stop shop for version control, building packages, CI/CD, security, dashboards, etc. It has its idiosyncrasies, and there are some things that I think could be done better. However, the improvements and new features that I see every month are amazing. I won't even put TFS in the same category as Azure DevOps. So I will always continue to improve in this area, and I will never stop learning.", proficiency: 8 },
    { category: "Cloud Tech", description: "Azure", justification: "Azure is one of the biggest players in the cloud computing arena. I've been using Azure for development, testing, and production for a while now. There are still areas that I can see my skill growing, and I can also see that the platform is getting bigger and bigger.", proficiency: 7 },
    { category: "Cloud Tech", description: "Amazon Web Services (AWS)", justification: "I use AWS in the same way as Azure. However, I have found that AWS is more difficult to learn than Azure. I am not sure why, but there you have it. However, AWS is a necessary cloud environment to learn, and I can see my skill growing in this area as well.", proficiency: 6 },
    { category: "Cloud Tech", description: "Google Cloud Platform (GCP)", justification: "I have only recently started experimenting with Google Cloud Platform. I have found it to be very easy to learn and use. It will probably be the future for me, given the low barrier to entry that I have found with the platform. I will probably abandon AWS and Azure over time.", proficiency: 3 }
];

// Get the container for the word cloud
const wordCloudContainer = document.getElementById('wordcloud');
// Get the container for the left side
const leftSideContainer = document.getElementById('leftSideContainer');
// Calculate the height of the left side
const leftSideHeight = leftSideContainer.clientHeight;

// Set the height of the word cloud section to one third of the height of the left side
wordCloudContainer.style.height = `${leftSideHeight / 3}px`;

// Prepare data for the word cloud
const wordCloudData = proficiencies.map(proficiency => [proficiency.description, proficiency.proficiency * 5]);

const getColorForWord = (word, weight, fontSize, distance, theta) => {
    const proficiency = proficiencies.find(item => item.description === word);
    if (proficiency) {
        switch (proficiency.category) {
            case 'Roles':
                return 'aqua';
            case 'Programming Language':
                return 'red';
            case 'Principles':
                return 'orange';
            case 'Cloud Tech':
                return 'blue';
            default:
                return 'black';            
        }
    } else {
        // Return a default color if the word is not found
        return 'black'; // or any other default color
    }
};


const displayTooltip = (item, dimension, event) => {
    //get the proficiency
    if (!item) return;
    
    const proficiency = proficiencies.find(term => term.description === item[0]);

    //set the tooltip text
    const ttText = '<b>' + proficiency.description + '</b><br><b>Category:</b> ' + proficiency.category + '<br><b>Proficiency:</b> ' + proficiency.proficiency + '<br><b>Justification:</b> ' + proficiency.justification;

    const tooltipElement = document.getElementById('wordcloud-tooltip');
    tooltipElement.innerHTML = ttText;

    // Position tooltip at cursor
    tooltipElement.style.left = (event.pageX + 10) + 'px'; 
    tooltipElement.style.top = (event.pageY) + 'px'; 

    // Ensure tooltip is on top of other elements
    tooltipElement.style.zIndex = 9999;

    // Show tooltip
    tooltipElement.style.display = 'block';

    // define the event when the mouse leaves this area
    event.target.addEventListener('mouseout', () => {
        // Hide tooltip
        tooltipElement.style.display = 'none';
});}

// Generate the word cloud
WordCloud(wordCloudContainer, {
   list: wordCloudData, 
   fontFamily: "Arial",
   color: getColorForWord, 
   hover: displayTooltip
});

// WordCloud(wordCloudContainer, {
//     list: [['foo', 12], ['bar', 6]]
// });

