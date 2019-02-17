class GlobalLogger {
    static logGlobalsToConsole() {
        for(let email of CONTACT_EMAIL_ARRAY) {
            console.log(`found contact : ${email}`);
        }
    }
}


class ContactLogger {
    static logContactData() {
        for (let contact of CONTACT_DATA) {
            console.log(`DisplayText: ${contact.DisplayText}` + 
                `, Email : ${contact.Email}`);
        }
    }
}

window.onload = () => {
    // GlobalLogger.logGlobalsToConsole();
    ContactLogger.logContactData();
}

