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
                placeholder: this.config.placeholder || "Enter password"
            });

            const meter = this.markup("div", null, {
                className: "password-strength-meter mt-2",
                style: "height: 8px; background: #ddd;"
            });

            this.input = input;
            this.meter = meter;

            this.dom = this.markup("div", [input, meter]);
            return this.dom;
        }

        onRender() {
            const input = $(this.input);
            const meter = $(this.meter);
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
                if (percent >= 80) color = "green";
                else if (percent >= 60) color = "orange";
                else if (percent >= 40) color = "red";

                meter.css({
                    "width": percent + "%",
                    "background": color
                });
            });
        }
    }

    controlClass.register("passwordStrength", controlPasswordStrength);
});
