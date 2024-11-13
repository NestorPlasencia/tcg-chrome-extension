export const getCookie = (domain: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (chrome.cookies) {
      chrome.cookies.get({ url: `https://${domain}`, name }, (cookie) => {
        if (cookie) {
          resolve(cookie.value);
        } else {
          reject(new Error("Cookie not found"));
        }
      });
    } else {
      reject(new Error("chrome.cookies is undefined"));
    }
  });
};
