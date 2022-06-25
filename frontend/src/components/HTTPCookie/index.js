import React, { useEffect, useState } from "react";
import axios from "../../httpClient";
function HTTPCookie() {
    const [isHTTPOnlyCookieAvailable, setIsHTTPOnlyCookieAvailable] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [didBackendReceiveToken, setDidBackendReceiveToken] = useState(false);
    useEffect(() => {
        //this function enables the backend to set the HTTPOnly cookie
        async function setHttpOnlyCookie() {
            const obj = {
                email: "vijay@korkai.com",
                password: "123"
            };
            try {
                const res = await axios.post("/auth/setHttpOnlyCookie", obj);
                if (res.status === 201) {
                    console.log(res);
                    console.log("In");
                    setIsHTTPOnlyCookieAvailable(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setHttpOnlyCookie();
        setIsMounted(true);
    }, []);
    const sendHttpOnlyCookie = async () => {
        //In order to send the HTTPOnly cookie you should always add the 'with credentials' attribute to your request.
        try {
            const res = await axios.post("/auth/sendHttpOnlyCookie");
            if (res.status === 200) {
                console.log(res);
                setDidBackendReceiveToken(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const removeHttpOnleCookie = async () => {
        try {
            const res = await axios.post("auth/removeHttpOnlyCookie");
            if (res.status === 200) {
                console.log(res);
                setIsHTTPOnlyCookieAvailable(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1>HTTP Only Cookie Test!</h1>
            {isHTTPOnlyCookieAvailable ? (
                <h4> The HTTP only cookie was set by the backend. For more info, look for the set cookie with your browser's inspection tool.</h4>
            ) : null}
            {!isHTTPOnlyCookieAvailable && isMounted ? (
                <h4> The HTTP only cookie was removed by the backend. Refresh the page to set the HTTP only cookie-token again.</h4>
            ) : null}
            {didBackendReceiveToken && isHTTPOnlyCookieAvailable ? <h5>The backend received the token. Check the console of your backend.</h5> : null}
            <button onClick={sendHttpOnlyCookie} disabled={!isHTTPOnlyCookieAvailable && isMounted}>
                Send HTTP Only Cookie
            </button>
            &nbsp;
            <button onClick={removeHttpOnleCookie} disabled={!isHTTPOnlyCookieAvailable}>
                Remove HTTP Only Cookie
            </button>
        </div>
    );
}

export default HTTPCookie;
