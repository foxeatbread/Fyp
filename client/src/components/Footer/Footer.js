import React from "react";

function Footer() {
    return (
        <div className="bg-background-tertiary text-copy-primary flex flex-row sm:flex-col sm:text-center sm:justify-around justify-between bg-gray-800 h-32">
            <div className="container flex flex-col justify-center ml-12 sm:ml-0">
                <p className="text-gray-500 text-lg sm:text-sm">
                    Proudly built with ⚛
                </p>
            </div>
            <div className="container flex flex-col justify-center text-right pr-4">
                <p className="text-gray-500 text-sm">
                    Gu<br />
                    South East Technology University<br />
                    20100200@wit.ie
                </p>
            </div>
        </div>
    );
}

export default Footer;
