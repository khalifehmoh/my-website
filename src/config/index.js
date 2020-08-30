module.exports = {

    author: "mohammad khalifeh",
    siteTitle: "Mohammad Khalifeh Front End Engineer",
    siteShortTitle: "Home", // Used as logo text in header, footer, and splash screen
    siteDescription: "Mohammad Khalifeh Front-end Engineer Personal Website",
    siteUrl: "https://gatsby-starter-portfolio-minimal.netlify.app/",
    siteLanguage: "en_US",
    siteIcon: "src/content/favicon.png", // Relative to gatsby-config file

    splashScreen: false, // Set this to true if you want to use the splash screen

    // There are icons available for the following platforms: 
    // Medium, GitHub, LinkedIn, XING, Behance
    socialMedia: [
        {
            name: "Linkedin",
            url: "https://www.linkedin.com/in/mohammad-khalifeh/"
        },
        // {
        //     name: "Medium",
        //     url: "https://medium.com/@konstantin.muenster"
        // },
        {
            name: "Github",
            url: "https://github.com/khalifehmoh"
        }
    ],

    navLinks: {
        menu: [
            {
                name: "About Me",
                url: "/#about",
            },
            {
                name: "Career Timeline",
                url: "/#career",
            },
            {
                name: "Articles",
                url: "/#articles",
            },
            {
                name: "Projects",
                url: "/#projects",
            }
        ],
        button: {
            name: "Contact",
            url: "/#contact",
        }
    },

    footerLinks: [
        // {
        //     name: "Contact",
        //     url: "/#contact"
        // },
        // {
        //     name: "Imprint",
        //     url: "/imprint"
        // }
    ]
}