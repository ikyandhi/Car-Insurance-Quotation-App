const SESSION_ID_KEY = 'rycic_session_id';
const sessionTtl = 2 * 365 * 24 * 60; // 2 years
var config = {};

// http://stackoverflow.com/a/2117523/1177228
function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// http://www.quirksmode.org/js/cookies.html
function setCookie(name, value, ttl) {
    var expires = "";
    var cookieDomain = "";
    if (ttl) {
        var date = new Date();
        date.setTime(date.getTime() + (ttl * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    var domain = config.cookieDomain || config.domain;
    if (domain) {
        cookieDomain = "; domain=" + domain;
    }
    document.cookie = name + "=" + escape(value) + expires + cookieDomain + "; path=/";
}

function getCookie(name) {
    var i, c;
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return unescape(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

export function setSessionID() {
    let sessionId = getCookie(SESSION_ID_KEY);

    if (!sessionId) {
        sessionId = generateId();
        setCookie(SESSION_ID_KEY, sessionId, sessionTtl);
        localStorage.setItem(sessionId, JSON.stringify({}));
    }

    return sessionId;

}

export function getSessionID() {
    return getCookie(SESSION_ID_KEY);
}

export function appendData(key, value) {
    let sessionId = setSessionID();
    let formData = JSON.parse(localStorage.getItem(sessionId));

    formData[key] = value;
    localStorage.setItem(sessionId, JSON.stringify(formData));

}

export function fetchData(key) {
    let sessionId = setSessionID();
    let formData = JSON.parse(localStorage.getItem(sessionId));

    if (!key) {
        return formData;
    }

    return (formData[key]) ? formData[key] : false;

}