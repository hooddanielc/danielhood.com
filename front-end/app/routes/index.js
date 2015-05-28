import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      languages: [
        "ActionScript",
        "Bash",
        "C++",
        "CSS 2/3",
        "Java",
        "JavaScript",
        "Objective-C",
        "PHP",
        "Python",
        "Swift"
      ],
      frontBuzzWords: [
        "AngularJS",
        "Backbone",
        "EmberJS",
        "jQuery",
        "PhoneGap",
        "Underscore",
        "Wordpress",
        "YUI 2/3"
      ],
      backendBuzzWords: [
        "Apache",
        "Kerberos",
        "MongoDB",
        "MySql",
        "Postgres",
        "NodeJS",
        "PyBottle",
        "Tomcat"
      ],
      toolsBuzzWords: [
        "Eclipse",
        "gcc",
        "Git",
        "JasmineJS",
        "JUnit",
        "Mocha",
        "MonkeyRunner",
        "Review Board",
        "Selenium",
        "Sublime Text",
        "Subversion",
        "Vi",
        "Visual Studio",
        "Vows",
        "X-Code"
      ],
      experiences: [
        {
          company: "APPLE",
          state: "CA",
          city: "Cupertino",
          title: "Front-End Engineer (Contractor)",
          startDate: "4/14",
          endDate: "+",
          gained: [
            "Developed server- and client-side web applications for http://www.apple.com website.",
            "Designed and built website testing tools using NodeJS and C++.",
            "Followed test-driven development patterns and fast iteration using SCRUM.",
            "Participated in the effort to unveil iWatch, iPhone 6, and Swift programming language at Apple World-Wide Developers Conference.",
            "Projects included a remote screen-shot tool for Android and iOS, a test automation scripting language and interpreter, and an image analysis tool using OpenCV."
          ]
        },
        {
          company: "ROOSTER FISH LABS",
          state: "CA",
          city: "Los Angeles",
          title: "Front-End Engineer (Contractor)",
          startDate: "8/13",
          endDate: "4/14",
          gained: [
            "On-call prototype-maker for many projects initiated by the company founders.",
            "Principle engineer for an iOS application called Me Flashcards, which was an in-classroom educational tool delivered on iPads.",
            "Principle engineer for the Digital Candy project, a service for managing the property rights for digital media. This included a large multimedia indexing engine and a user interface for searching it.",
            "Designed and developed small websites to support specific marketing efforts, such as promoting Earth Day (http://theadvocator.com/earthday/)."
          ]
        },
        {
          company: "WELLS FARGO",
          state: "CA",
          city: "San Francisco",
          title: "Front-End Engineer (Contractor)",
          startDate: "3/13",
          endDate: "8/13",
          gained: [
            "Developed and supported a variety of in-house web apps used by banking customers",
            "Helped to transition the company from YUI 2 to 3 and provided internal support and training on the framework.",
            "Developed web applications using ARIA, a protocol for making web apps for disabled persons."
          ]
        },
        {
          company: "CREATIVE CIRCLE",
          state: "CA",
          city: "San Francisco",
          title: "Front-End Engineer (Contractor)",
          startDate: "10/12",
          endDate: "3/13",
          gained: [
            "Part of a stable of web developers who took on multiple short assignments from start to finish.",
            "Handled complete lifecycle, from requirements and design to implementation, testing, and deployment.",
            "Developed prototypes in a fast paced manner with high end frameworks."
          ]
        },
        {
          company: "TAGGED",
          state: "CA",
          city: "San Francisco",
          title: "Software Engineering Intern / Front-End Engineer (Contractor)",
          startDate: "1/12",
          endDate: "7/12",
          gained: [
            "Originally hired for a four-month internship to work on the company's main site, then kept on as a contractor.",
            "Helped transition the company's JavaScript and Java infrastructure to a cleaner client-server API.",
            "Developed code in an automated test environment based on Selenium and Monkey Runner.",
            "Developed the client side of Entourage, an Android-based social game produced by the company. The back-end used the company's proprietary high-performance graph database engine."
          ]
        }
      ],
      edumacations: [
        {
          school: "COLLEGE Of WESTERN IDAHO",
          state: "ID",
          city: "Boise",
          startDate: "2008",
          endDate: "2009",
          description: "Computer Science and Information Systems"
        },
        {
          school: "SOUTH LAKE TAHOE COMMUNITY COLLEGE",
          state: "CA",
          city: "South Lake Tahoe",
          startDate: "2010",
          endDate: "2011",
          description: "Computer and Information Sciences, Web Development"
        }
      ]
    }
  },

  intialize: function () {
    console.log('init');
  }.on('init')
});
