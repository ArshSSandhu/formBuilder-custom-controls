"use strict";

/**
 * Password Strength Meter Plugin for formBuilder 
 * Author: Arshpreet Singh Sandhu
 * License: MIT
 */

if (!window.fbControls) window.fbControls = [];

window.fbControls.push(function(controlClass) {
    class controlPasswordStrength extends controlClass {
        static get definition() {
            return {
                icon: "🔒",
                i18n: { default: "Password" },
                defaultAttrs: {
                    placeholder: {
                        label: "Placeholder",
                        value: "Enter password",
                        type: "text"
                    },
                    minLength: {
                        label: "Minimum Length",
                        value: 6,
                        type: "number"
                    }
                }
            };
        }

        build() {
            const input = this.markup("input", null, {
                type: "password",
                className: "form-control password-input",
                placeholder: this.config.placeholder || "Enter password",
                style: "width: 250px; height: 38px; padding: 6px; font-size: 14px;"
            });

            const meter = this.markup("div", null, {
                className: "password-strength-meter",
                style: `
                    height: 10px;
                    width: 250px;
                    background: #eee;
                    border-radius: 5px;
                    margin-top: 6px;
                    overflow: hidden;
                `
            });

            const meterBar = this.markup("div", null, {
                className: "password-strength-bar",
                style: `
                    height: 100%;
                    width: 0%;
                    background: #ddd;
                    transition: width 0.3s ease, background 0.3s ease;
                `
            });

            meter.appendChild(meterBar);

            this.input = input;
            this.meterBar = meterBar;

            const container = this.markup("div", [input, meter], {
                style: "display: flex; flex-direction: column; align-items: flex-start;"
            });

            this.dom = container;
            return container;
        }

        onRender() {
            const input = $(this.input);
            const bar = $(this.meterBar);
            const minLength = parseInt(this.config.minLength || 6);

            input.on("input", function() {
                const val = input.val();
                let score = 0;

                if (val.length >= minLength) score++;
                if (/[a-z]/.test(val)) score++;
                if (/[A-Z]/.test(val)) score++;
                if (/[0-9]/.test(val)) score++;
                if (/[^a-zA-Z0-9]/.test(val)) score++;

                const percent = (score / 5) * 100;

                let color = "#ddd";
                if (percent >= 80) color = "#4CAF50";       
                else if (percent >= 60) color = "#FFA500";   
                else if (percent >= 40) color = "#FF6347";   
                else color = "#ddd";

                bar.css({
                    "width": percent + "%",
                    "background": color
                });
            });
        }
    }

    controlClass.register("passwordStrength", controlPasswordStrength);
});
