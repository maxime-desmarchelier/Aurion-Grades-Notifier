const puppeteer = require("puppeteer");
const config = require("./config");
const {JSDOM} = require("jsdom");

class AurionHandler {
    async getSubjectList() {
        // Launch puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width: 1366, height: 768});

        // Go to CAS login page
        await page.goto('https://cas.ensiie.fr/login?service=https%3A%2F%2Faurionweb.ensiie.fr%2F%2Flogin%2Fcas');

        // Fill the login form
        await page.type('#username', config.credentials.user);
        await page.type('#password', config.credentials.password);
        // Validate the form
        await page.keyboard.press('Enter');

        // Waiting for page laoding
        await page.waitForNavigation();

        // If we are back on the CAS login page, it means that the credentials are wrong
        if (page.url() === 'https://cas.ensiie.fr/login?service=https%3A%2F%2Faurionweb.ensiie.fr%2F%2Flogin%2Fcas') {
            throw new Error("Mauvais mot de passe");
        }

        // Navigate to the grades menu
        const gradesButton = await page.$x("//*[contains(text(), 'Résultats')]");
        if (gradesButton.length > 0) {
            await gradesButton[0].click();
        } else {
            throw new Error("Résultats button not found");
        }

        // Waiting for submenu to load
        await page.waitForXPath("//*[contains(text(), 'Notes aux épreuves année en cours')]");

        // Click on current year grades
        const myGradesBtn = await page.$x("//*[contains(text(), 'Notes aux épreuves année en cours')][@class='ui-menuitem-text']");

        // Look for the right button, sometimes a new button is added to the menu
        let btnNumber = 0;
        while (await page.evaluate(el => el.textContent, myGradesBtn[btnNumber]) !== 'Notes aux épreuves année en cours') {
            btnNumber++;
        }
        await myGradesBtn[btnNumber].click();

        // Waiting for page to load
        await page.waitForNavigation();

        // Get the page content
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);

        // Close the browser
        await browser.close();

        // Parse the page content
        const dom = new JSDOM(data);

        // Get the subjects list
        const table = dom.window.document.querySelectorAll('tr');

        let subjects = [];
        // For each row in the table
        table.forEach((row) => {
            const tds = row.querySelectorAll('td');
            // For each cell in the row
            tds.forEach((td) => {
                // If the cell contains a subject name
                if (td.textContent.startsWith("Libellé")) {
                    subjects.push(td.textContent.split("Libellé")[1].trim());
                }
            });
        });

        return subjects;
    }
}

module.exports = AurionHandler;