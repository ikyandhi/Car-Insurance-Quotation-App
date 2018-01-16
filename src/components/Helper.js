function ucwords(str) {
    let res = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });

    return res;
}

export function getValidator(inputs, rules) {

    let messageBag = [];

    for (let key of Object.keys(rules)) {

        if (messageBag.length > 0) {
            return messageBag;
        }

        let inputRule = rules[key];

        for (let i = 0; i < inputRule.length; i++) {

            switch (inputRule[i]) {
                case 'required':
                    if (!inputs[key]) {
                        messageBag.push({'key': key, 'message': "The " + ucwords(key) + " is required."});
                    }
                    break;
                case 'email':
                    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs[key]))) {
                        messageBag.push({'key': key, 'message': "The " + ucwords(key) + " is invalid email."});
                    }
                    break;
                    
                //@TODO numeric validation
                case 'numeric':
                    if (!(/^-?\d+\.?\d*$/.test(inputs[key]))) {
                        messageBag.push({'key': key, 'message': "The " + ucwords(key) + " is not numeric."});
                    }
                    break;

                //@TODO MY mobile phone validation
                case 'mobile-my':
                    break;

                default:
                    break;
            }

        }
    }

    return messageBag;

}