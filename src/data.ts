export interface Education {
  city: string;
  description: string;
  endDate: string;
  school: string;
  startDate: string;
  state: string;
};

export interface Experience {
  city: string;
  company: string;
  endDate: string;
  gained: string[];
  startDate: string;
  state: string;
  title: string;
};

export interface Link {
  title: string;
  description: string;
  href: string;
};

export interface ResumeData {
  address: string;
  backend_buzz_words: string[];
  education: Education[];
  experience: Experience[];
  frontend_buzz_words: string[];
  language: string[];
  links: Link[];
  phone: string;
  short_about_me: string;
  tool_buzz_words: string[];
};

export const data: ResumeData = {
  "address": "14603 160th CT SE, Renton, WA 98059",
  "phone": "415-553-0661",
  "short_about_me": "I'm a passionate software developer who loves to program.",
  "backend_buzz_words": [
    "AWS",
    "ECS",
    "EKS",
    "Terraform",
    "Gitlab Pipelines",
    "Kubernetes",
    "Typescript",
    "Kafka",
    "New Relic",
    "Nginx",
    "Express",
    "Apache",
    "Kerberos",
    "MongoDB",
    "MySql/Maria",
    "Postgres",
    "NodeJS",
    "PyBottle",
    "Tomcat",
    "Rails",
    "Docker",
    "Cloudformation",
    "Google Cloud",
    "Cloud Watch",
    "Kubernete",
    "ECS",
    "Fargate",
    "Embedded Jetty"
  ],
  "education": [
    {
      "city": "Boise",
      "description": "Computer Science and Information Systems",
      "endDate": "2009",
      "school": "College of Western Idaho",
      "startDate": "2008",
      "state": "id"
    },
    {
      "city": "South Lake Tahoe",
      "description": "Computer and Information Sciences, Web Development",
      "endDate": "2011",
      "school": "South Lake Tahoe Community College",
      "startDate": "2010",
      "state": "CA"
    }
  ],
  "experience": [
    {
      "city": "Seattle",
      "company": "Sinclair Broadcast Group",
      "endDate": "3/22",
      "gained": [
        "Develop and maintain 100’s of consumer facing websites for news-stations using reusable components (you might notice that they all look the same e.g. komonews.com,  kutv.com, star64.tv, weartv.com, katu.com, etc.).",
        "Re-Implement old front-end build systems using new tools and frameworks such as Webpack and React.",
        "Build upon existing automation for better test code-coverage and testability.",
        "Converted projects to use modern build tools for bundling websites (ex.. webpack) rather than using complicated internal java automation to reduce developer time significantly.",
        "Port bamboo CI/CD pipelines to Gitlab CI/CD for releasing faster.",
        "Create and maintain infrastructure for http, websocket services using AWS services ECS, EKS, Fargate, etc. and Google Cloud services e.g. Firebase, Google Maps, etc.",
        "Create and maintain event driven services using Confluent, Kafka, Rabbit/Amazon MQ, SQS.",
        "Use terraform for automating manual devops processes using Gitlab CI/CD.",
        "Created and released first livestream web app to 100’s of news websites for watching all SBGTV news content under `/watch` url. (katu.com/watch, komonews.com/watch).",
      ],
      "startDate": "10/16",
      "state": "wa",
      "title": "Full-Stack Software Engineer"
    },
    {
      "city": "Bellevue",
      "company": "Expedia",
      "endDate": "9/16",
      "gained": [
        "Maintain Expedia's consumer facing hotel site and develop new features and experiments.",
        "Developed end2end testing image for docker using headless selenium software.",
        "Implement new features using Jetty, Gradle, Maven, Java and Scala.",
        "Introduce and push integration testing frameworks using new es6 features.",
        "Introduce es6 to es5 transpiler.",
      ],
      "startDate": "7/16",
      "state": "wa",
      "title": "Front-End Engineer (Contractor)"
    },
    {
      "city": "Seattle",
      "company": "Getty Images",
      "endDate": "6/16",
      "gained": [
        "Maintain a consumer facing website.",
        "Use teaspoon for unit testing framework.",
        "Build template driven UI using handlebars.",
        "Learn a lot about their infrastructure commonly referred to as “Unisporcle”.",
      ],
      "startDate": "2/16",
      "state": "wa",
      "title": "Front-End Engineer (Contractor)"
    },
    {
      "city": "Seattle",
      "company": "Zooppa",
      "endDate": "2/16",
      "gained": [
        "Maintain EmberJS web app for consumer facing website.",
        "Maintain ruby http server on zoopa.com for implementing new features for video contests.",
        "Used Ember version 2.1.0.",
        "Created front end unit testing methods with ember-cli and pushed to be used in release process.",
        "Learn Ruby on Rails using Active Model and Active Record.",
        "Learn Emblem templating language to ease the burden of writing handlebar templates.",
      ],
      "startDate": "7/15",
      "state": "wa",
      "title": "Front-End Engineer (Contractor)"
    },
    {
      "city": "Cupertino",
      "company": "Apple",
      "endDate": "7/15",
      "gained": [
        "Develop client-side web applications for http://www.apple.com website.",
        "Create and maintain testing tools using NodeJS and C++.",
        "Create and implement test-driven development patterns for reducing developer effort.",
        "Help unveil first iWatch, iPhone 6, and Swift programming language at Apple World-Wide Developers Conference..",
        "Create internal tools for testing developers and manual QA.",
        "Create remote screen-shot tools for Android and iOS.",
        "Create scripting language and interpreter for manually verifying changes affect multiple pages simultaneously automatically.",
        "Create an internal image analysis tool (Not machine learning) using OpenCV for manual QA.",
        "Create and Maintain an internal app for automatically tracking and managing 100’s of devices used by manual quality assurance teams.",
      ],
      "startDate": "4/14",
      "state": "ca",
      "title": "Front-End Engineer (Contractor)"
    },
    {
      "city": "Los Angeles",
      "company": "Rooster Fish Labs",
      "endDate": "4/14",
      "gained": [
        "On-call developer for many prototypes.",
        "Develop an iOS application called Me Flashcards, an in-classroom educational tool for iPad.",
        "Develop service for managing the property rights of digital media.",
        "Develop user interface for Digital Candy, a tool to manage media DCMA.",
        "Use columnar databases for indexing large datasets for faster searching and high availability.",
        "Prototype small websites to support specific marketing efforts, such as promoting Sustainable Living (http://www.ecodads.org/).",
      ],
      "startDate": "8/13",
      "state": "ca",
      "title": "Front-End Engineer (Contractor)"
    },
    {
      "city": "San Francisco",
      "company": "Wells Fargo",
      "endDate": "8/13",
      "gained": [
        "Develop and support a variety of consumer facing web apps.",
        "Maintain internal frameworks and tools for rapidly creating websites using reusable components.",
        "Upgrade codebase from YUI2 to YUI3.",
        "Provide internal support and training for developers using internal framework.",
        "Develop web applications using ARIA, a methodology to help make web apps more accessible.",
      ],
      "startDate": "3/13",
      "state": "ca",
      "title": "Front-End Engineer (Contractor)"
    },
    {
      "city": "San Francisco",
      "company": "Creative Circle",
      "endDate": "3/13",
      "gained": [
        "Develop web-apps for many clients.",
        "Handle complete development lifecycle from requirements gathering, design, implementation, testing, and deployment.",
        "Mostly developed quick prototypes.",
      ],
      "startDate": "10/12",
      "state": "ca",
      "title": "Front-End Engineer (Contractor)"
    },
    {
      "city": "San Francisco",
      "company": "Tagged",
      "endDate": "7/12",
      "gained": [
        "Originally hired for a four-month internship to work on the company's main site, then kept on as a contractor.",
        "Helped transition the company's JavaScript and Java infrastructure to a cleaner client-server API.",
        "Develop code in an automated test environment based on Selenium and Monkey Runner.",
        "Develop the client side of Entourage, an Android-based social game produced by the company. The back-end used the company's proprietary high-performance graph database named STIG.",
      ],
      "startDate": "1/12",
      "state": "ca",
      "title": "Software Engineering Intern / Front-End Engineer (Contractor)"
    }
  ],
  "frontend_buzz_words": [
    "AngularJS",
    "Arduino",
    "Backbone",
    "EmberJS",
    "Jasmine",
    "jQuery",
    "jQuery",
    "Lodash",
    "Material UI (android, ios and web)",
    "Meteor",
    "Mocha",
    "PhoneGap",
    "Ramda",
    "Raspberry Pi",
    "React Native",
    "React",
    "Socket.IO",
    "Underscore",
    "Underscore",
    "Vue.js",
    "Wordpress",
    "YUI 2/3",
  ],
  "language": [
    "ActionScript",
    "Bash",
    "Batch",
    "C",
    "C++11",
    "C++14",
    "C++17",
    "C99",
    "CSS 2/3",
    "GLSL",
    "Go",
    "Java",
    "JavaScript",
    "JSX",
    "Kotlin",
    "Objective-C",
    "PHP",
    "Python",
    "Ruby",
    "SASS/SCSS",
    "Swift",
    "Type Script",
    "Yacc"
  ],
  "links": [
    {
      "title": "My Github",
      "description": "Where I put all of my code",
      "href": "https://github.com/hooddanielc"
    }
  ],
  "tool_buzz_words": [
    "Arduino",
    "Babel",
    "Bison",
    "Crosstool-NG",
    "CSS Modules",
    "Depot Tools",
    "Docker",
    "Eclipse",
    "ESLint",
    "gcc",
    "Git",
    "ib (https://github.com/jasonl9000/ib)",
    "JSHint",
    "JUnit",
    "Make",
    "MonkeyRunner",
    "Nano",
    "openembedded",
    "Raspberry Pi",
    "Review Board",
    "Selenium",
    "Sublime Text",
    "Subversion",
    "Vi",
    "Virtual Box",
    "Visual Studio",
    "VMWare",
    "Vows",
    "WebPack",
    "X-Code",
    "Yocto",
  ]
}
