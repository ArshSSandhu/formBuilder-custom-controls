"use strict";

/**
 * OTP Input Plugin for formBuilder 
 * Author: Arshpreet Singh Sandhu
 * License: MIT
 */

if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function(controlClass) {
    class controlOtpInput extends controlClass {
        static get definition() {
            return {
                icon: "🔢",
                i18n: {
                    default: "OTP Input",
                },
                defaultAttrs: {
                    length: {
                        label: "OTP Length",
                        type: "number",
                        value: 6,
                        min: 1,
                        max: 10
                    },
                    placeholder: {
                        label: "Placeholder",
                        type: "text",
                        value: "*"
                    }
                }
            };
        }

        build() {
            const { length = 6, placeholder = "*" } = this.config;
            const wrapper = this.markup("div", null, { className: "otp-wrapper", style: "display: flex; gap: 8px;" });

            for (let i = 0; i < length; i++) {
                const input = this.markup("input", null, {
                    type: "text",
                    maxlength: 1,
                    placeholder,
                    className: "otp-digit",
                    style: "width: 2em; text-align: center;"
                });
                wrapper.appendChild(input);
            }

            this.dom = wrapper;
            return this.dom;
        }

        onRender() {
            const inputs = this.dom.querySelectorAll(".otp-digit");
            inputs.forEach((input, index) => {
                input.addEventListener("input", () => {
                    if (input.value && index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                });
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Backspace" && !input.value && index > 0) {
                        inputs[index - 1].focus();
                    }
                });
            });
        }
    }

    controlClass.register("otpInput", controlOtpInput);
});
