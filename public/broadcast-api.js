const broadcast = new BroadcastChannel("tabsOpen");
broadcast.postMessage("firstTab");
let originalTab = true;

broadcast.onmessage = (event) => {
  if (event.data === "firstTab" && originalTab) {
    broadcast.postMessage("Already Open");
  } else if (event.data === "Already Open") {
    originalTab = false;

    document.body.innerHTML = `
    <dialog open style="
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0%, -50%);
        background-color: #f8f9fa;
        border: 1px solid #ced4da;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        color: #333;
    ">
        App is already open in another tab!
    </dialog>`;
  }
};
