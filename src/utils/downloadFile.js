export const downloadFile = async (download_link) => {
  const url = process.env.REACT_APP_API_KEY + download_link;
  const a = document.createElement("a");
  a.href = url;
  a.download = url?.substring(url?.lastIndexOf("/") + 1);
  a.style.display = "none";

  // Append the anchor to the body
  document.body.appendChild(a);

  // Simulate a click on the anchor element
  a.click();

  // Clean up
  document.body.removeChild(a);

  // await window.to_electron.DOWNLOAD_FILE("DOWNLOAD_FILE", download_link);
};
