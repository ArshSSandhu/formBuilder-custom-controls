"use strict";

/**
 * Signature Pad Plugin for formBuilder.
 * Author: Arshpreet Singh Sandhu
 * License: MIT
 */

if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
  class controlSignaturePad extends controlClass {
    static get definition() {
      return {
        icon: "✍️",
        i18n: {
          default: "Signature Pad",
        },
        defaultAttrs: {
          className: "signature-pad",
        },
      };
    }

    build() {
      const canvas = this.markup("canvas", null, {
        class: "signature-canvas",
        width: 300,
        height: 150,
        style: "border: 1px solid #000; touch-action: none;",
      });
      const clearBtn = this.markup("button", "Clear", {
        type: "button",
        class: "btn btn-sm btn-warning clear-signature",
      });
      this.dom = this.markup("div", [canvas, clearBtn], { class: "signature-wrapper" });
      return this.dom;
    }

    onRender() {
      const canvas = this.dom.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      let drawing = false;

      const startDraw = (e) => {
        drawing = true;
        ctx.beginPath();
        const pos = this.getMousePos(e, canvas);
        ctx.moveTo(pos.x, pos.y);
        e.preventDefault();
      };

      const draw = (e) => {
        if (!drawing) return;
        const pos = this.getMousePos(e, canvas);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        e.preventDefault();
      };

      const endDraw = () => {
        drawing = false;
      };

      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", endDraw);
      canvas.addEventListener("mouseleave", endDraw);

      canvas.addEventListener("touchstart", startDraw);
      canvas.addEventListener("touchmove", draw);
      canvas.addEventListener("touchend", endDraw);

      const clearBtn = this.dom.querySelector(".clear-signature");
      clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }

    getMousePos(evt, canvas) {
      const rect = canvas.getBoundingClientRect();
      const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    }
  }

  controlClass.register("signaturePad", controlSignaturePad);
});
