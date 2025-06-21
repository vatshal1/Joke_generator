const btn = document.querySelector("button");
const para = document.querySelector("p");
const category = document.querySelector("#category");
const emoji = document.querySelector(".emoji");

btn.addEventListener("click", joke);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !btn.disabled) {
    joke();
  }
});
category.addEventListener("change", changeEmoji);

//-> using async/ await
async function joke() {
  para.innerText = ""; //. joke removed
  para.classList.remove("error"); //. remove error (if any)
  para.classList.remove("fade-in"); //. fadin effect

  btn.classList.add("loading"); //. loading animation
  btn.disabled = true; //. button can't be accessed
  btn.textContent = "Loading..."; //. Loading while fetching

  try {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${category.value}?blacklistFlags=racist,sexist,explicit&type=single`
    );
    if (!response.ok)
      throw new Error(`Error occured! status: ${response.status}`);

    const data = await response.json();
    para.innerText = `"${data.joke}"`;

    setTimeout(() => {
      para.classList.add("fade-in");
    }, 500);
  } catch (err) {
    para.classList.add("error");
    setTimeout(() => {
      para.classList.add("fade-in");
    }, 500);

    para.innerText =
      "Sorry couldn't fetch the joke right now. Please try again!";
  } finally {
    btn.disabled = false;
    btn.classList.remove("loading");
    btn.textContent = "Get Jokes";
  }
}

function changeEmoji() {
  const emojis = {
    Any: "😂",
    Programming: "💻",
    Dark: "🌙",
    Pun: "😄",
    Spooky: "👻",
    Christmas: "🎄",
    Miscellaneous: "🎭",
  };

  emoji.textContent = emojis[category.value] || "😂";
}
