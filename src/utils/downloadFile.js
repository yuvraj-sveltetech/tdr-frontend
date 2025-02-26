import {BASE_URL} from "./config"
export const downloadFile = async (download_link) => {
  try {
    // Construct the download URL
    const url = BASE_URL + download_link;

    // Validate the file's availability (optional)
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Create a hidden anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = url.substring(url.lastIndexOf("/") + 1); // Extract filename
    a.style.display = "none";

    // Append, click, and remove the anchor element
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("File download failed:", error);
  }
};
